import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function Checkout() {
  const { items, subtotal, itemCount } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const safeItems = useMemo(() => {
    return items
      .map((i) => ({
        id: i.id,
        name: i.name,
        unitPrice: Number(i.unitPrice) || 0,
        quantity: Math.max(1, Math.floor(Number(i.quantity) || 1)),
        partNumber: i.partNumber,
      }))
      .filter((i) => i.unitPrice > 0 && i.quantity > 0);
  }, [items]);

  const isEmpty = safeItems.length === 0;

  async function startStripeCheckout() {
    setError(null);

    if (isEmpty) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: safeItems }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Checkout failed. Please try again.");
      }

      if (!data?.url) {
        throw new Error("Missing Stripe redirect URL.");
      }

      window.location.href = data.url;
    } catch (e: any) {
      setError(e?.message || "Checkout failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">
              Secure payment via Stripe. You’ll be redirected to complete payment.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link to="/cart">Back to Cart</Link>
          </Button>
        </div>

        {isEmpty ? (
          <Card className="mt-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              <div className="mt-4">
                <Button asChild>
                  <Link to="/parts">Go to Parts</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {safeItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold">{item.name}</div>
                        {item.partNumber ? (
                          <div className="text-sm text-muted-foreground">Part #: {item.partNumber}</div>
                        ) : null}
                        <div className="mt-1 text-sm text-muted-foreground">
                          {formatUSD(item.unitPrice)} × {item.quantity}
                        </div>
                      </div>

                      <div className="text-right font-bold">
                        {formatUSD(item.unitPrice * item.quantity)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold">Order Summary</h2>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Items</span>
                    <span className="font-semibold">{itemCount}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatUSD(subtotal)}</span>
                  </div>

                  {error ? (
                    <div className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm">
                      {error}
                    </div>
                  ) : null}

                  <div className="mt-6 space-y-3">
                    <Button className="w-full" onClick={startStripeCheckout} disabled={loading}>
                      {loading ? "Redirecting…" : "Pay Securely (Stripe)"}
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/cart">Edit Cart</Link>
                    </Button>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    By paying, you agree to FleetForge terms. For fleet accounts/POs, use the Quote form.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
