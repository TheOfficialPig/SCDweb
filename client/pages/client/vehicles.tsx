import ClientDashboardLayout from "@/components/layout/ClientDashboardLayout";
import ClientDashboardLayout from "@/components/layout/ClientDashboardLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MyVehicles() {
  const [vehicles, setVehicles] = useState<{ id: string; make: string; model: string; year: string }[]>([]);
  const [form, setForm] = useState({ make: "", model: "", year: "" });

  function add() {
    if (!form.make || !form.model) return alert("Please provide make & model");
    setVehicles((s) => [...s, { id: Math.random().toString(36).slice(2), ...form }]);
    setForm({ make: "", model: "", year: "" });
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">My Vehicles</h1>
        <p className="mt-2 text-muted-foreground">Manage your car information</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm">Make</label>
            <Input value={form.make} onChange={(e) => setForm((f) => ({ ...f, make: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm">Model</label>
            <Input value={form.model} onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm">Year</label>
            <Input value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} />
          </div>
          <div className="flex items-end">
            <Button onClick={add}>Add Vehicle</Button>
          </div>
        </div>

        <div className="mt-8 grid gap-3">
          {vehicles.map((v) => (
            <div key={v.id} className="rounded-lg border p-4">
              <div className="font-semibold">{v.make} {v.model}</div>
              <div className="text-sm text-muted-foreground">{v.year}</div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
