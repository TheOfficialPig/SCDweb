import Layout from "@/components/layout/Layout";

import StaffDashboardLayout from "@/components/layout/StaffDashboardLayout";

export default function StaffClients() {
  return (
    <StaffDashboardLayout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Clients</h1>
        <p className="mt-2 text-muted-foreground">All client profiles (auto-created from quotes)</p>

        <div className="mt-6">
          <div className="rounded-lg border p-6">No clients yet (connected to server-side DB soon)</div>
        </div>
      </section>
    </StaffDashboardLayout>
  );
}
