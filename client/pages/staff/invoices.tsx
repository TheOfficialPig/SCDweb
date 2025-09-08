import StaffDashboardLayout from "@/components/layout/StaffDashboardLayout";
import { useState, useEffect } from "react";

export default function StaffInvoices() {
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState("");
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
    const res = await fetch("/api/admin/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, amount: Math.round(Number(amount)) }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Invoice created");
      setAmount("");
    } else setMessage(data?.error || "Failed");
  }

  return (
    <StaffDashboardLayout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Invoices & Payments</h1>
        <p className="mt-2 text-muted-foreground">
          Generate, send, and export invoices
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <form onSubmit={submit} className="rounded-lg border p-6">
            <div>
              <label className="block text-sm">Client</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2"
              >
                <option value="">Select client</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3">
              <label className="block text-sm">Amount (cents)</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
              >
                Create Invoice
              </button>
            </div>
            {message && <div className="mt-3 text-sm">{message}</div>}
          </form>

          <div className="rounded-lg border p-6">
            <div className="font-semibold">Recent Invoices</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Invoices are stored in-memory on the server.
            </div>
          </div>
        </div>
      </section>
    </StaffDashboardLayout>
  );
}
