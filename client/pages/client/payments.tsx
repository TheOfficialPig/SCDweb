import Layout from "@/components/layout/Layout";

export default function PaymentsAndInvoices() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Payments & Invoices</h1>
        <p className="mt-2 text-muted-foreground">Pay online and view payment history</p>

        <div className="mt-6">
          <div className="rounded-lg border p-6">No invoices yet</div>
        </div>
      </section>
    </Layout>
  );
}
