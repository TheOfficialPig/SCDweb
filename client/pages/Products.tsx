import Layout from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/api";

function currency(cents: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(cents / 100);
}

export default function Products() {
  const { data } = useQuery<{ items: Product[] }>({ queryKey: ["products"], queryFn: async () => (await fetch("/api/products")).json() });
  const { add, state } = useCart();

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Products</h1>
            <p className="mt-2 text-muted-foreground">Cleaners, wax, accessories, gift cards, memberships</p>
          </div>
          <div className="rounded-lg border px-4 py-2 text-sm">
            Cart • {state.items.reduce((s, i) => s + i.quantity, 0)} items • {currency(state.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.items.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <img src={p.image} alt={p.name} className="aspect-[4/3] w-full object-cover" />
              <CardHeader>
                <CardTitle>{p.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="font-semibold">{currency(p.price)}</div>
                <Button onClick={() => add(p)}>Add to cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <CheckoutBar />
      </section>
    </Layout>
  );
}

function CheckoutBar() {
  const { state, clear } = useCart();
  const total = state.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  if (state.items.length === 0) return null;

  async function checkout() {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: state.items, provider: "manual" }),
    });
    if (res.ok) {
      clear();
      alert("Order placed! You can integrate Stripe/PayPal/Apple Pay next.");
    }
  }

  return (
    <div className="sticky bottom-4 mt-10 flex justify-center">
      <div className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-xl border bg-background/95 p-4 shadow-xl backdrop-blur">
        <div className="text-sm text-muted-foreground">
          {state.items.length} items • {currency(total)}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={clear}>Clear</Button>
          <Button onClick={checkout}>Checkout</Button>
        </div>
      </div>
    </div>
  );
}
