import Layout from "@/components/layout/Layout";

export default function StaffManagement() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <p className="mt-2 text-muted-foreground">Add/remove staff and assign roles</p>

        <div className="mt-6">
          <div className="rounded-lg border p-6">No staff yet</div>
        </div>
      </section>
    </Layout>
  );
}
