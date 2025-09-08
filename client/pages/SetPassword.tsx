import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SetPassword() {
  const [search] = useSearchParams();
  const email = search.get("email") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return alert("Missing email");
    if (!password) return alert("Enter a password");
    if (password !== confirm) return alert("Passwords do not match");
    const res = await fetch("/api/auth/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      alert("Password set. You can now sign in.");
      navigate("/login");
    } else {
      const data = await res.json();
      alert(data?.error || "Failed to set password");
    }
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-bold">Set your password</h1>
          <p className="mt-2 text-muted-foreground">
            Set a password to secure your account for future logins.
          </p>

          <form onSubmit={submit} className="mt-6 grid gap-3">
            <div>
              <label className="text-sm">Email</label>
              <Input value={email} readOnly />
            </div>
            <div>
              <label className="text-sm">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Confirm Password</label>
              <Input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            <Button type="submit">Save Password</Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
