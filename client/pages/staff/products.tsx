import StaffDashboardLayout from "@/components/layout/StaffDashboardLayout";

export default function StaffProducts() {
  return (
    <StaffDashboardLayout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Services / Add-ons</h1>
        <p className="mt-2 text-muted-foreground">Manage service packages, add-ons, and memberships</p>

        <div className="mt-6">
          <div className="rounded-lg border p-6">Manage your service offerings here.</div>
        </div>
      </section>
    </StaffDashboardLayout>
  );
}
