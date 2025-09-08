import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ClientDashboard() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Overview • Next appointment • Invoices • Rewards</p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border p-5">
            <div className="text-sm text-muted-foreground">Next Appointment</div>
            <div className="mt-1 text-xl font-semibold">No appointment scheduled</div>
            <Button asChild className="mt-4"><Link to="/contact">Book a Service</Link></Button>
          </div>
          <div className="rounded-xl border p-5">
            <div className="text-sm text-muted-foreground">Invoices</div>
            <div className="mt-1 text-xl font-semibold">0 unpaid</div>
            <Button asChild variant="secondary" className="mt-4"><Link to="/services">View Services</Link></Button>
          </div>
          <div className="rounded-xl border p-5">
            <div className="text-sm text-muted-foreground">Rewards</div>
            <div className="mt-1 text-xl font-semibold">Join our membership</div>
            <Button asChild variant="outline" className="mt-4"><Link to="/services">View Memberships</Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
