import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "staff">("client");
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  // read role from query param to preselect
  useEffect(() => {
    try {
      const qr = searchParams.get("role");
      if (qr === "staff" || qr === "client") setRole(qr as "client" | "staff");
    } catch {}
  }, [searchParams]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return alert("Please enter your Gmail address");
    setLoading(true);
    // staff flow: magic login if staff exists
    if (role === "staff") {
      const res = await login({ email, role: "staff" });
      setLoading(false);
      if (!res.ok) return alert(res.error || "Unable to sign in as staff");
      navigate("/staff");
      return;
    }

    // client flow: check and login
    const attempt = await login({ email, password, role: "client" });
    setLoading(false);
    if (attempt.ok) {
      navigate("/dashboard");
      return;
    }
    if (attempt.needsPassword) {
      // user exists but needs to set password
      navigate(`/set-password?email=${encodeURIComponent(email)}`);
      return;
    }
    if (attempt.error && attempt.error.includes("not found")) {
      // register new client
      const r = await register({ email });
      if (r?.ok) {
        navigate(`/set-password?email=${encodeURIComponent(email)}`);
      } else if (r?.error) {
        alert(r.error);
      } else {
        alert("Registered. Please set your password.");
        navigate(`/set-password?email=${encodeURIComponent(email)}`);
      }
      return;
    }
    alert(attempt.error || "Login failed");
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="mt-2 text-muted-foreground">Sign in with your Gmail. Staff must use registered Gmail accounts.</p>

          <form onSubmit={submit} className="mt-6 grid gap-3">
            <label className="text-sm">Email (Gmail)</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="you@gmail.com" />

            <label className="text-sm">Password (clients only after first-time)</label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" />

            <label className="text-sm">Role</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setRole("client")} className={`rounded-md px-3 py-2 ${role === "client" ? "bg-primary text-primary-foreground" : "border"}`}>
                Client
              </button>
              <button type="button" onClick={() => setRole("staff")} className={`rounded-md px-3 py-2 ${role === "staff" ? "bg-primary text-primary-foreground" : "border"}`}>
                Staff
              </button>
            </div>

            <Button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
