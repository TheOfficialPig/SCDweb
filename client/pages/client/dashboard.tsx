import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ClientDashboardOverview() {
  const { user } = useAuth();
  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
        <p className="mt-2 text-muted-foreground">Overview • Next appointment • Invoices • Status updates</p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-5">
            <div className="text-sm text-muted-foreground">Next Appointment</div>
            <div className="mt-1 text-xl font-semibold">No appointment scheduled</div>
            <Link to="/contact" className="mt-4 inline-block text-sm text-primary">Book a Service</Link>
          </div>

          <div className="rounded-xl border p-5">
            <div className="text-sm text-muted-foreground">Invoices</div>
            <div className="mt-1 text-xl font-semibold">0 unpaid</div>
          </div>

          <div className="rounded-xl border p-5">
            <div className="text-sm text-muted-foreground">Rewards</div>
            <div className="mt-1 text-xl font-semibold">0 points</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          <Link to="/dashboard/vehicles" className="rounded-lg border p-4 text-center">My Vehicles</Link>
          <Link to="/dashboard/jobs" className="rounded-lg border p-4 text-center">My Jobs</Link>
          <Link to="/dashboard/payments" className="rounded-lg border p-4 text-center">Payments & Invoices</Link>
        </div>
      </section>
    </Layout>
  );
}
