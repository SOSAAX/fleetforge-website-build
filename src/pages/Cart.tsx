// src/pages/Cart.tsx
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { items, subtotal, setQty, removeItem, itemCount } = useCart();

  return (
    <Layout>
      <div className="container-custom section-padding">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {!items.length ? (
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">Your cart is empty.</p>
              <div className="mt-4">
                <Button asChild className="bg-accent hover:bg-orange-hover text-accent-foreground">
                  <a href="/parts">Back to Parts</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {items.map((i) => (
                <Card key={i.id} className="bg-card border-border">
                  <CardContent className="pt-6 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{i.name}</p>
                      {i.partNumber ? (
                        <p className="text-sm text-muted-foreground">Part #: {i.partNumber}</p>
                      ) : null}
                      <p className="text-sm text-muted-foreground mt-1">
                        ${i.unitPrice.toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setQty(i.id, i.quantity - 1)}
                        disabled={i.quantity <= 1}
                      >
                        -
                      </Button>

                      <span className="w-8 text-center font-medium">{i.quantity}</span>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setQty(i.id, i.quantity + 1)}
                      >
                        +
                      </Button>

                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeItem(i.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card border-border h-fit">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Items</p>
                <p className="text-xl font-bold mb-4">{itemCount}</p>

                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="text-2xl font-bold mb-6">${subtotal.toFixed(2)}</p>

                <Button asChild className="w-full bg-accent hover:bg-orange-hover text-accent-foreground">
                  <a href="/checkout">Continue to Checkout</a>
                </Button>

                <p className="text-xs text-muted-foreground mt-3">
                  Taxes/shipping/service fees (if any) are calculated at checkout.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
