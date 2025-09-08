import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [role, setRole] = useState<"client" | "staff">("client");
  const { login } = useAuth();
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return alert("Please enter your name");
    login({ name, role });
    navigate(role === "staff" ? "/staff" : "/dashboard");
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="mt-2 text-muted-foreground">Sign in as a client or staff to access your dashboard.</p>

          <form onSubmit={submit} className="mt-6 grid gap-3">
            <label className="text-sm">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} name="name" />

            <label className="text-sm">Role</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setRole("client")} className={`rounded-md px-3 py-2 ${role === "client" ? "bg-primary text-primary-foreground" : "border"}`}>
                Client
              </button>
              <button type="button" onClick={() => setRole("staff")} className={`rounded-md px-3 py-2 ${role === "staff" ? "bg-primary text-primary-foreground" : "border"}`}>
                Staff
              </button>
            </div>

            <Button type="submit">Sign in</Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
