import StaffDashboardLayout from "@/components/layout/StaffDashboardLayout";
import { useState } from "react";

export default function StaffManagement() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("tech");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/admin/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Staff created");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      setMessage(data?.error || "Failed to create staff");
    }
  }

  return (
    <StaffDashboardLayout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <p className="mt-2 text-muted-foreground">
          Add/remove staff and assign roles
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <form onSubmit={submit} className="rounded-lg border p-6">
            <div>
              <label className="block text-sm">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>
            <div className="mt-3">
              <label className="block text-sm">Email (Gmail)</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>
            <div className="mt-3">
              <label className="block text-sm">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2"
              >
                <option value="owner">Owner</option>
                <option value="manager">Manager</option>
                <option value="lead">Lead</option>
                <option value="tech">Tech</option>
              </select>
            </div>
            <div className="mt-3">
              <label className="block text-sm">Password (optional)</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
              >
                Create Staff
              </button>
            </div>
            {message && <div className="mt-3 text-sm">{message}</div>}
          </form>

          <div className="rounded-lg border p-6">
            <div className="font-semibold">Existing Staff</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Staff list is managed in memory (server). Use Supabase integration
              to persist.
            </div>
          </div>
        </div>
      </section>
    </StaffDashboardLayout>
  );
}
