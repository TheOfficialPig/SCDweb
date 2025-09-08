import StaffDashboardLayout from "@/components/layout/StaffDashboardLayout";

export default function StaffJobs() {
  return (
    <StaffDashboardLayout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Jobs & Appointments</h1>
        <p className="mt-2 text-muted-foreground">Manage quotes, schedule jobs, upload photos, assign staff</p>

        <div className="mt-6">
          <div className="rounded-lg border p-6">No jobs yet</div>
        </div>
      </section>
    </StaffDashboardLayout>
  );
}
