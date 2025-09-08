import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Role = "client" | "staff" | "owner";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role | string;
}

const STORAGE = "auth.user.v1";

const AuthCtx = createContext<{
  user: User | null;
  login: (payload: { email: string; password?: string; role?: string }) => Promise<{ ok: boolean; needsPassword?: boolean; error?: string }>;
  logout: () => void;
  register: (payload: { name?: string; email: string }) => Promise<any>;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE, JSON.stringify(user));
    else localStorage.removeItem(STORAGE);
  }, [user]);

  async function login(payload: { email: string; password?: string; role?: string }) {
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) return { ok: false, error: data?.error || "Login failed" };
      if (data.needsPassword) return { ok: false, needsPassword: true };
      if (data.user) {
        setUser({ id: data.user.id, name: data.user.name, email: data.user.email, role: data.user.role });
        return { ok: true };
      }
      // for staff magic login
      if (data.ok && data.user) {
        setUser({ id: data.user.id, name: data.user.name, email: data.user.email, role: data.user.role });
        return { ok: true };
      }
      return { ok: false, error: "Unknown response" };
    } catch (err: any) {
      return { ok: false, error: err.message };
    }
  }

  async function register(payload: { name?: string; email: string }) {
    const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    return res.json();
  }

  function logout() {
    setUser(null);
    navigate("/");
  }

  return <AuthCtx.Provider value={{ user, login, logout, register }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireAuth({ children, role }: { children: React.ReactNode; role?: string }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (role && user.role && user.role !== role) {
      // redirect to appropriate home
      navigate(user.role === "owner" || user.role === "staff" ? "/staff" : "/dashboard", { replace: true });
    }
  }, [user, role, navigate]);

  if (!user) return null;
  if (role && user.role !== role) return null;
  return <>{children}</>;
}
