import StaffDashboardLayout from "@/components/layout/StaffDashboardLayout";

export default function StaffInvoices() {
  return (
    <StaffDashboardLayout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Invoices & Payments</h1>
        <p className="mt-2 text-muted-foreground">Generate, send, and export invoices</p>

        <div className="mt-6">
          <div className="rounded-lg border p-6">No invoices yet</div>
        </div>
      </section>
    </StaffDashboardLayout>
  );
}
