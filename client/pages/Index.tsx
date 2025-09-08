import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { SITE } from "@/config";
import { Link } from "react-router-dom";

function ServiceCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card/60 p-6 shadow-sm backdrop-blur">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop"
          alt="Shiny detailed car"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background/90" />
        <div className="relative container mx-auto flex min-h-[75dvh] flex-col items-start justify-center px-4 py-24 text-white">
          <span className="mb-3 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">Mobile + Studio • {SITE.city}</span>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Professional Auto Detailing in
            <p className="mt-0">Joshua</p>
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Interior, exterior, and full-detail packages. Ceramic coatings, engine bay, and premium add-ons. Book a free quote in minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="shadow-lg">
              <Link to="/contact">Book a Free Quote</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="bg-white/20 text-white hover:bg-white/30">
              <Link to="/services">View Services & Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services at a glance */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Services at a Glance</h2>
          <p className="mt-2 text-muted-foreground">Choose the perfect package for your vehicle</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ServiceCard
            title="Interior Detail"
            desc="Deep clean, shampoo, leather treatment, odor neutralization."
            icon={<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='size-5'><path fill='currentColor' d='M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v6.75a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z'/></svg>}
          />
          <ServiceCard
            title="Exterior Detail"
            desc="Foam wash, Tire Shine, Window Cleaning."
            icon={<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='size-5'><path fill='currentColor' d='M3 12a9 9 0 1 1 18 0z'/></svg>}
          />
          <ServiceCard
            title="Full Detail"
            desc="Complete inside & out Detailing."
            icon={<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='size-5'><path fill='currentColor' d='M12 2a10 10 0 1 0 0 20z'/></svg>}
          />
          <ServiceCard
            title="Add-ons"
            desc="Oder remover, headlight restore, pet hair."
            icon={<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='size-5'><path fill='currentColor' d='M12 3v18M3 12h18'/></svg>}
          />
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg"><Link to="/services">See Packages</Link></Button>
        </div>
      </section>

      {/* Social proof */}
      <section className="relative overflow-hidden py-16">
        <div className="container mx-auto grid items-center gap-8 px-4 md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1600&auto=format&fit=crop"
            alt="Before and after detailing"
            className="aspect-video w-full rounded-xl object-cover shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">Showroom results, every time</h3>
            <p className="mt-2 text-muted-foreground">
              Trusted by car enthusiasts and families alike. We bring professional-grade techniques and meticulous care to every service.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild variant="secondary"><Link to="/gallery">View Gallery</Link></Button>
              <Button asChild><Link to="/contact">Get a Free Quote</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
