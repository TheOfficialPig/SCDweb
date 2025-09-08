import { Link } from "react-router-dom";
import { SITE } from "@/config";

export default function StaffDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <div className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <div className="text-lg font-semibold">{SITE.name} • Staff Portal</div>
            <div className="text-sm text-muted-foreground">Manage clients, jobs, and operations</div>
          </div>
          <nav className="flex gap-2">
            <Link to="/staff" className="rounded-md px-3 py-2 hover:bg-accent">Overview</Link>
            <Link to="/staff/clients" className="rounded-md px-3 py-2 hover:bg-accent">Clients</Link>
            <Link to="/staff/jobs" className="rounded-md px-3 py-2 hover:bg-accent">Jobs</Link>
            <Link to="/staff/invoices" className="rounded-md px-3 py-2 hover:bg-accent">Invoices</Link>
            <Link to="/staff/services" className="rounded-md px-3 py-2 hover:bg-accent">Services</Link>
            <Link to="/staff/reports" className="rounded-md px-3 py-2 hover:bg-accent">Reports</Link>
            <Link to="/staff/staff-management" className="rounded-md px-3 py-2 hover:bg-accent">Staff</Link>
            <Link to="/staff/messaging" className="rounded-md px-3 py-2 hover:bg-accent">Messaging</Link>
          </nav>
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
