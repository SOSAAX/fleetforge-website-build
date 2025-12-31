import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function Cart() {
  const navigate = useNavigate();
  const { items, setQty, removeItem, clearCart, subtotal, itemCount } = useCart();

  const isEmpty = items.length === 0;

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Cart</h1>
            <p className="text-muted-foreground">
              {itemCount > 0 ? `${itemCount} item(s) in cart` : "Your cart is empty"}
            </p>
          </div>

          <Button asChild variant="outline">
            <Link to="/parts">Continue Shopping</Link>
          </Button>
        </div>

        {isEmpty ? (
          <Card className="mt-8">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Nothing here yet. Add items from the Parts page.
              </p>
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
              {items.map((item) => {
                const qty = Number.isFinite(item.quantity) ? item.quantity : 1;
                const safeQty = Math.max(1, Math.floor(qty));
                const lineTotal = item.unitPrice * safeQty;

                return (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="text-lg font-semibold">{item.name}</div>
                          {item.partNumber ? (
                            <div className="text-sm text-muted-foreground">Part #: {item.partNumber}</div>
                          ) : null}
                          <div className="mt-1 text-sm text-muted-foreground">
                            Unit: {formatUSD(item.unitPrice)}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setQty(item.id, Math.max(1, safeQty - 1))}
                          >
                            -
                          </Button>

                          <div className="min-w-[44px] text-center font-semibold">{safeQty}</div>

                          <Button variant="outline" onClick={() => setQty(item.id, safeQty + 1)}>
                            +
                          </Button>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right font-bold">{formatUSD(lineTotal)}</div>
                          <Button variant="destructive" onClick={() => removeItem(item.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold">Order Summary</h2>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatUSD(subtotal)}</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Taxes/shipping (if any) calculated at checkout.
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button className="w-full" onClick={() => navigate("/checkout")}>
                      Continue to Checkout
                    </Button>
                    <Button variant="outline" className="w-full" onClick={clearCart}>
                      Clear Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold">Need help fast?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Call or message FleetForge and we’ll quote same-day for most parts.
                  </p>
                  <div className="mt-4">
                    <Button asChild variant="secondary" className="w-full">
                      <Link to="/contact">Contact</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
