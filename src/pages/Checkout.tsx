// src/pages/Checkout.tsx
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const { items } = useCart();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        if (!items.length) {
          setError("Your cart is empty.");
          return;
        }

        // Map CartContext items -> server expects {name, price, quantity, partNumber}
        const payload = {
          items: items.map((i) => ({
            name: i.name,
            price: i.unitPrice,
            quantity: i.quantity,
            partNumber: i.partNumber,
          })),
        };

        const res = await fetch("/.netlify/functions/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok || !data?.url) {
          throw new Error(data?.error || "Could not start checkout.");
        }

        window.location.href = data.url;
      } catch (e: any) {
        setError(e.message || "Checkout failed.");
      }
    };

    run();
  }, [items]);

  return (
    <Layout>
      <div className="container-custom section-padding">
        <h1 className="text-3xl font-bold mb-3">Redirecting to secure checkout…</h1>
        <p className="text-muted-foreground mb-6">
          If you aren’t redirected, use the button below.
        </p>

        {error ? (
          <div className="p-4 rounded-lg border bg-card">
            <p className="text-red-500 font-medium mb-3">{error}</p>
            <Button asChild className="bg-accent hover:bg-orange-hover text-accent-foreground">
              <a href="/cart">Back to Cart</a>
            </Button>
          </div>
        ) : (
          <Button asChild className="bg-accent hover:bg-orange-hover text-accent-foreground">
            <a href="/cart">Back to Cart</a>
          </Button>
        )}
      </div>
    </Layout>
  );
}
