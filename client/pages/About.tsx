import Layout from "@/components/layout/Layout";
import { SITE } from "@/config";

export default function About() {
  return (
    <Layout>
      <section className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop"
          alt="Our team"
          className="aspect-video w-full rounded-xl object-cover shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">About {SITE.name}</h1>
          <p className="mt-4 text-muted-foreground">
            We started {SITE.name} to bring professional-grade detailing to {SITE.city} with convenience and care. Our team treats every car like our own, using the best tools and techniques to deliver lasting results.
          </p>
          <p className="mt-2 text-muted-foreground">
            From daily drivers to exotics, we tailor every service to your needs. Our mission is simple: deliver showroom-level results with honesty and consistency.
          </p>
        </div>
      </section>
    </Layout>
  );
}
