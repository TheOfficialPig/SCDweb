import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Package({
  name,
  price,
  features,
  img,
}: {
  name: string;
  price: string;
  features: string[];
  img: string;
}) {
  return (
    <Card className="overflow-hidden">
      <img src={img} alt={name} className="aspect-video w-full object-cover" />
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between">
          <span>{name}</span>
          <span className="text-xl font-bold">Starting at {price}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="mb-6 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <Button asChild className="w-full">
          <Link to="/contact">Book a Free Quote</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Services() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Services & Pricing</h1>
          <p className="mt-2 text-muted-foreground">
            Interior • Exterior • Full Detail • Add-ons
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Package
            name="Interior Detail"
            price="$149"
            img="https://images.unsplash.com/photo-1616207132229-3d1f2449dd88?q=80&w=1600&auto=format&fit=crop"
            features={[
              "Vacuum & shampoo",
              "Leather clean & condition",
              "Windows & mirrors",
              "Ozone odor treatment",
            ]}
          />
          <Package
            name="Exterior Detail"
            price="$129"
            img="https://images.unsplash.com/photo-1536520002442-39764a41e37c?q=80&w=1600&auto=format&fit=crop"
            features={[
              "Foam wash & decon",
              "Clay bar treatment",
              "Machine polish",
              "Sealant for 6+ months",
            ]}
          />
          <Package
            name="Full Detail"
            price="$249"
            img="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1600&auto=format&fit=crop"
            features={[
              "Interior + Exterior",
              "Engine bay detail",
              "Trim restoration",
              "Glass coating",
            ]}
          />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold">Upsells & Add-ons</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="font-medium">Ceramic Coating</div>
              <div className="text-sm text-muted-foreground">
                From $399 • 2–5 year protection
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="font-medium">Engine Bay Detail</div>
              <div className="text-sm text-muted-foreground">From $59</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="font-medium">Headlight Restoration</div>
              <div className="text-sm text-muted-foreground">From $79</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
