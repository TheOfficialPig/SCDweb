import Layout from "@/components/layout/Layout";

export default function StaffDashboard() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Staff Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Overview • Clients • Jobs • Reports</p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border p-5">
            <div className="text-sm text-muted-foreground">Today's Jobs</div>
            <div className="mt-1 text-xl font-semibold">0</div>
          </div>
          <div className="rounded-xl border p-5">
            <div className="text-sm text-muted-foreground">Pending Quotes</div>
            <div className="mt-1 text-xl font-semibold">0</div>
          </div>
          <div className="rounded-xl border p-5">
            <div className="text-sm text-muted-foreground">Revenue (30d)</div>
            <div className="mt-1 text-xl font-semibold">$0</div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
