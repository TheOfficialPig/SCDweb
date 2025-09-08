import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Role = "client" | "staff" | null;

interface User {
  id: string;
  name: string;
  role: Exclude<Role, null>;
}

const STORAGE = "auth.user.v1";

const AuthCtx = createContext<{
  user: User | null;
  login: (payload: { name: string; role: Exclude<Role, null> }) => void;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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

  function login(payload: { name: string; role: Exclude<Role, null> }) {
    const u: User = { id: `user_${Math.random().toString(36).slice(2, 9)}`, name: payload.name, role: payload.role };
    setUser(u);
  }

  function logout() {
    setUser(null);
  }

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireAuth({ children, role }: { children: React.ReactNode; role?: Exclude<Role, null> }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (role && user.role !== role) {
      // redirect to appropriate home
      navigate(user.role === "staff" ? "/staff" : "/dashboard", { replace: true });
    }
  }, [user, role, navigate]);

  if (!user) return null;
  if (role && user.role !== role) return null;
  return <>{children}</>;
}
