import ClientDashboardLayout from "@/components/layout/ClientDashboardLayout";
import { useEffect, useState } from "react";

type Job = { id: string; serviceType: string; status: "quote" | "scheduled" | "in_progress" | "completed"; scheduledAt?: string };

export default function MyJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // fetch jobs from API when available; using local mock for now
    setJobs([]);
  }, []);

  return (
    <ClientDashboardLayout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">My Jobs</h1>
        <p className="mt-2 text-muted-foreground">Track status of your service requests</p>

        <div className="mt-6 grid gap-4">
          {jobs.length === 0 && <div className="rounded-lg border p-6">No jobs yet</div>}
          {jobs.map((j) => (
            <div key={j.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{j.serviceType}</div>
                  <div className="text-sm text-muted-foreground">{j.scheduledAt ?? "Not scheduled"}</div>
                </div>
                <div className="text-sm">{j.status}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </ClientDashboardLayout>
  );
}
