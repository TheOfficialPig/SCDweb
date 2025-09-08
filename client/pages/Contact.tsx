import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      vehicleMake: formData.get("vehicleMake") as string,
      vehicleModel: formData.get("vehicleModel") as string,
      vehicleYear: formData.get("vehicleYear") as string,
      serviceType: formData.get("serviceType") as string,
      preferredDate: formData.get("preferredDate") as string,
      notes: formData.get("notes") as string,
    };
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(
        "Thanks! Your request was received. We'll contact you shortly.",
      );
      e.currentTarget.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <Layout>
      <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Book a Free Quote</h1>
          <p className="mt-2 text-muted-foreground">
            Fill out the form and our team will reach out to confirm details and
            pricing.
          </p>
          <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Creates a client profile and a pending job for our staff</li>
            <li>You'll get confirmation by email/text once scheduled</li>
          </ul>
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-xl border bg-card p-6 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <Input name="name" required placeholder="Jane Doe" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Phone</label>
              <Input name="phone" required placeholder="(555) 555-5555" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <Input
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Preferred Date
              </label>
              <Input name="preferredDate" type="date" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Vehicle Make
              </label>
              <Input name="vehicleMake" required placeholder="Tesla" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Vehicle Model
              </label>
              <Input name="vehicleModel" required placeholder="Model 3" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Vehicle Year
              </label>
              <Input name="vehicleYear" required placeholder="2023" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Service Type
              </label>
              <Input name="serviceType" required placeholder="Full Detail" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">Notes</label>
              <Textarea
                name="notes"
                placeholder="Tell us more about your vehicle or any concerns"
              />
            </div>
          </div>
          <Button disabled={loading} className="mt-6 w-full" type="submit">
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
          {success && <p className="mt-3 text-sm text-green-600">{success}</p>}
        </form>
      </section>
    </Layout>
  );
}
