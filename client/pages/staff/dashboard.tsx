import Layout from "@/components/layout/Layout";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function StaffDashboardOverview() {
  const [clients, setClients] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((r) => r.json())
      .then((d) => setClients(d.items || []))
      .catch(() => setClients([]));

    fetch("/api/admin/jobs")
      .then((r) => r.json())
      .then((d) => setJobs(d.items || []))
      .catch(() => setJobs([]));

    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((d) => setOrders(d.items || []))
      .catch(() => setOrders([]));
  }, []);

  const pendingQuotes = useMemo(() => jobs.filter((j) => j.status === "quote"), [jobs]);
  const todaysJobs = useMemo(() => jobs.filter((j) => !!j.scheduledAt), [jobs]);
  const revenue30d = useMemo(() => {
    const cutoff = Date.now() - 1000 * 60 * 60 * 24 * 30;
    return orders.reduce((sum, o) => {
      const t = new Date(o.createdAt).getTime();
      if (t >= cutoff) return sum + (o.total || 0);
      return sum;
    }, 0);
  }, [orders]);

  function currency(c: number) {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format((c || 0) / 100);
  }

  return (
    <Layout>
      <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <aside className="order-2 md:order-1 md:col-span-1">
          <div className="sticky top-20 space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="mb-2 text-sm font-semibold">Staff Console</div>
              <nav className="flex flex-col gap-2 text-sm">
                <Link className="block rounded px-3 py-2 hover:bg-accent" to="/staff">Overview</Link>
                <Link className="block rounded px-3 py-2 hover:bg-accent" to="/staff/clients">Clients</Link>
                <Link className="block rounded px-3 py-2 hover:bg-accent" to="/staff/jobs">Jobs</Link>
                <Link className="block rounded px-3 py-2 hover:bg-accent" to="/staff/invoices">Invoices</Link>
                <Link className="block rounded px-3 py-2 hover:bg-accent" to="/staff/services">Services</Link>
                <Link className="block rounded px-3 py-2 hover:bg-accent" to="/staff/reports">Reports</Link>
                <Link className="block rounded px-3 py-2 hover:bg-accent" to="/staff/staff-management">Staff</Link>
                <Link className="block rounded px-3 py-2 hover:bg-accent" to="/staff/messaging">Messaging</Link>
              </nav>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Quick Actions</div>
              <div className="mt-3 grid gap-2">
                <Link to="/staff/clients" className="rounded-md border px-3 py-2 text-sm">Add / Edit Client</Link>
                <Link to="/staff/jobs" className="rounded-md border px-3 py-2 text-sm">Create Job</Link>
              </div>
            </div>
          </div>
        </aside>

        <main className="md:col-span-3 order-1 md:order-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Staff Dashboard</h1>
              <p className="mt-1 text-muted-foreground">Overview of operations</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border p-5">
              <div className="text-sm text-muted-foreground">Today's Jobs</div>
              <div className="mt-1 text-xl font-semibold">{todaysJobs.length}</div>
            </div>
            <div className="rounded-xl border p-5">
              <div className="text-sm text-muted-foreground">Pending Quotes</div>
              <div className="mt-1 text-xl font-semibold">{pendingQuotes.length}</div>
            </div>
            <div className="rounded-xl border p-5">
              <div className="text-sm text-muted-foreground">Clients</div>
              <div className="mt-1 text-xl font-semibold">{clients.length}</div>
            </div>
            <div className="rounded-xl border p-5">
              <div className="text-sm text-muted-foreground">Revenue (30d)</div>
              <div className="mt-1 text-xl font-semibold">{currency(revenue30d)}</div>
            </div>
          </div>

          {/* Previews */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Recent Jobs</div>
                <Link to="/staff/jobs" className="text-sm text-primary">View all</Link>
              </div>
              <div className="mt-3 space-y-3">
                {jobs.slice(0, 4).map((j) => (
                  <div key={j.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{j.serviceType}</div>
                      <div className="text-sm text-muted-foreground">{j.status} • {j.scheduledAt ?? "—"}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{j.clientId ? "Client" : "Guest"}</div>
                  </div>
                ))}
                {jobs.length === 0 && <div className="text-sm text-muted-foreground">No jobs yet</div>}
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Recent Clients</div>
                <Link to="/staff/clients" className="text-sm text-primary">View all</Link>
              </div>
              <div className="mt-3 space-y-3">
                {clients.slice(0, 4).map((c) => (
                  <div key={c.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-sm text-muted-foreground">{c.email} • {c.phone}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{(c.vehicles || []).length} vehicles</div>
                  </div>
                ))}
                {clients.length === 0 && <div className="text-sm text-muted-foreground">No clients yet</div>}
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Recent Orders</div>
                <Link to="/staff/invoices" className="text-sm text-primary">View all</Link>
              </div>
              <div className="mt-3 space-y-3">
                {orders.slice(0, 4).map((o) => (
                  <div key={o.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Order {o.id}</div>
                      <div className="text-sm text-muted-foreground">{o.items?.length ?? 0} items</div>
                    </div>
                    <div className="text-sm font-semibold">{currency(o.total || 0)}</div>
                  </div>
                ))}
                {orders.length === 0 && <div className="text-sm text-muted-foreground">No orders yet</div>}
              </div>
            </div>
          </div>
        </main>
      </section>
    </Layout>
  );
}
