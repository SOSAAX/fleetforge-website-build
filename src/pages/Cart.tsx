import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

const STRIPE_RATE = 0.029; // 2.9% (estimate)
const STRIPE_FIXED = 0.30; // $0.30 (estimate)
const INVOICE_RATE = 0.004; // 0.4% (your invoice PDF fee)

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart } = useCart() as any;

  const netSubtotal = round2(
    (items || []).reduce((sum: number, it: any) => sum + it.price * (it.quantity ?? 1), 0)
  );

  // We want you to NET the netSubtotal, so we compute the customer total that covers fees.
  const percent = STRIPE_RATE + INVOICE_RATE;
  const grossTotal =
    netSubtotal <= 0 ? 0 : round2((netSubtotal + STRIPE_FIXED) / (1 - percent));

  const stripeFee = grossTotal <= 0 ? 0 : round2(grossTotal * STRIPE_RATE + STRIPE_FIXED);
  const invoiceFee = grossTotal <= 0 ? 0 : round2(grossTotal * INVOICE_RATE);

  // Rename the fee labels (do NOT call it Stripe/Invoice)
  const serviceHandling = stripeFee; // covers card processing
  const documentationProcessing = invoiceFee; // covers invoice PDF fee

  const customerPays = grossTotal;
  const youReceiveNet = round2(customerPays - stripeFee - invoiceFee);

  return (
    <>
      <Helmet>
        <title>Cart | FleetForge Truck Solutions</title>
        <meta name="description" content="Review your cart and checkout securely." />
      </Helmet>

      <Layout>
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Cart</h1>
                <p className="text-muted-foreground mt-2">
                  Review your items. Checkout will include a small service/admin adjustment so the
                  listed prices are covered net.
                </p>
              </div>

              {items?.length ? (
                <Button variant="outline" onClick={() => clearCart()}>
                  Clear cart
                </Button>
              ) : null}
            </div>

            {!items?.length ? (
              <Card className="bg-muted/40 border-border">
                <CardContent className="pt-6">
                  <p className="text-foreground font-medium">Your cart is empty.</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Go back to Parts & Supplies and add an item.
                  </p>
                  <div className="mt-4">
                    <Link to="/parts">
                      <Button className="bg-accent hover:bg-orange-hover text-accent-foreground">
                        Browse Parts
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Items */}
                <div className="lg:col-span-2 space-y-4">
                  {items.map((it: any) => {
                    const qty = it.quantity ?? 1;
                    return (
                      <Card key={it.id} className="bg-muted/40 border-border">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-foreground">{it.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Listed price: <span className="text-foreground font-medium">${it.price.toFixed(2)}</span>
                              </p>
                            </div>

                            <Button
                              variant="ghost"
                              className="text-muted-foreground hover:text-foreground"
                              onClick={() => removeItem(it.id)}
                              aria-label="Remove"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(it.id, Math.max(1, qty - 1))}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>

                              <div className="min-w-[44px] text-center font-semibold text-foreground">
                                {qty}
                              </div>

                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(it.id, qty + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="font-bold text-foreground">
                              ${(it.price * qty).toFixed(2)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                  <Card className="bg-muted/40 border-border sticky top-24">
                    <CardContent className="pt-6">
                      <h2 className="text-lg font-bold text-foreground">Order Summary</h2>

                      <div className="mt-4 space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Parts subtotal (listed)</span>
                          <span className="font-semibold text-foreground">${netSubtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Service & Handling</span>
                          <span className="font-semibold text-foreground">${serviceHandling.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Documentation & Processing</span>
                          <span className="font-semibold text-foreground">${documentationProcessing.toFixed(2)}</span>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between text-base">
                          <span className="font-semibold text-foreground">Customer total</span>
                          <span className="font-bold text-foreground">${customerPays.toFixed(2)}</span>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          * Fees are estimates and may vary slightly by card type.
                        </p>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">You receive (net)</span>
                          <span className="font-semibold text-foreground">${youReceiveNet.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="mt-5">
                        <Link to="/checkout">
                          <Button className="w-full bg-accent hover:bg-orange-hover text-accent-foreground">
                            Continue to Checkout
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>

                        <Link to="/parts" className="block mt-3">
                          <Button variant="outline" className="w-full">
                            Add more parts
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
