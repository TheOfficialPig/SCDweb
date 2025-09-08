import { Link } from "react-router-dom";
import { SITE } from "@/config";

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <div className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <div className="text-lg font-semibold">{SITE.name} • Client Portal</div>
            <div className="text-sm text-muted-foreground">Manage your appointments and vehicles</div>
          </div>
          <nav className="flex gap-2">
            <Link to="/dashboard" className="rounded-md px-3 py-2 hover:bg-accent">Overview</Link>
            <Link to="/dashboard/vehicles" className="rounded-md px-3 py-2 hover:bg-accent">My Vehicles</Link>
            <Link to="/dashboard/jobs" className="rounded-md px-3 py-2 hover:bg-accent">My Jobs</Link>
            <Link to="/dashboard/payments" className="rounded-md px-3 py-2 hover:bg-accent">Payments</Link>
            <Link to="/dashboard/rewards" className="rounded-md px-3 py-2 hover:bg-accent">Rewards</Link>
            <Link to="/dashboard/support" className="rounded-md px-3 py-2 hover:bg-accent">Support</Link>
          </nav>
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
