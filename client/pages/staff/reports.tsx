import StaffDashboardLayout from "@/components/layout/StaffDashboardLayout";

export default function StaffReports() {
  return (
    <StaffDashboardLayout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="mt-2 text-muted-foreground">
          Revenue, job volume, customer retention
        </p>

        <div className="mt-6">
          <div className="rounded-lg border p-6">Reports will appear here.</div>
        </div>
      </section>
    </StaffDashboardLayout>
  );
}
