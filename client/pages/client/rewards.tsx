import Layout from "@/components/layout/Layout";

export default function Rewards() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Rewards & Memberships</h1>
        <p className="mt-2 text-muted-foreground">Track loyalty points and membership status</p>

        <div className="mt-6">
          <div className="rounded-lg border p-6">You have 0 points. Join our membership for monthly perks.</div>
        </div>
      </section>
    </Layout>
  );
}
