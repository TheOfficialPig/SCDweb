import StaffDashboardLayout from "@/components/layout/StaffDashboardLayout";
import { useState, useEffect } from "react";

export default function StaffClients() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((r) => r.json())
      .then((d) => setClients(d.items || []))
      .catch(() => setClients([]));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Client created");
      setName("");
      setEmail("");
      setPhone("");
      setClients((s) => [data.client, ...s]);
    } else setMessage(data?.error || "Failed");
  }

  return (
    <StaffDashboardLayout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Clients</h1>
        <p className="mt-2 text-muted-foreground">
          All client profiles (auto-created from quotes)
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
              <label className="block text-sm">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>
            <div className="mt-3">
              <label className="block text-sm">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
              >
                Create Client
              </button>
            </div>
            {message && <div className="mt-3 text-sm">{message}</div>}
          </form>

          <div className="rounded-lg border p-6">
            <div className="font-semibold">Existing Clients</div>
            <div className="mt-2 space-y-3">
              {clients.map((c) => (
                <div key={c.id} className="rounded-md border p-3">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {c.email} • {c.phone}
                  </div>
                </div>
              ))}
              {clients.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  No clients yet
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </StaffDashboardLayout>
  );
}
