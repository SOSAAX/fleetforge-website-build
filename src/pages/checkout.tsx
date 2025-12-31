// src/pages/Checkout.tsx
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  partNumber?: string;
};

const CART_KEY = "fleetforge_cart"; // <-- IMPORTANT: must match whatever your Parts page uses

export default function Checkout() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const raw = localStorage.getItem(CART_KEY);
        const items: CartItem[] = raw ? JSON.parse(raw) : [];

        if (!items.length) {
          setError("Your cart is empty.");
          return;
        }

        const res = await fetch("/.netlify/functions/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });

        const data = await res.json();

        if (!res.ok || !data?.url) {
          throw new Error(data?.error || "Could not start checkout.");
        }

        window.location.href = data.url; // ✅ go to Stripe Checkout
      } catch (e: any) {
        setError(e.message || "Checkout failed.");
      }
    };

    run();
  }, []);

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
