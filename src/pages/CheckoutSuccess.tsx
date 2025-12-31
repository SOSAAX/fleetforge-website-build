import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

type VerifyResponse =
  | { ok: true; payment_status: string; amount_total?: number; currency?: string; customer_email?: string | null }
  | { ok: false; error: string };

function formatUSDFromCents(cents?: number, currency?: string) {
  if (typeof cents !== "number") return null;
  const amt = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency || "USD").toUpperCase(),
  }).format(amt);
}

export default function CheckoutSuccess() {
  const { clearCart } = useCart();
  const location = useLocation();
  const clearedRef = useRef(false);

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const sessionId = params.get("session_id");

  const [verifying, setVerifying] = useState<boolean>(!!sessionId);
  const [verify, setVerify] = useState<VerifyResponse | null>(null);

  useEffect(() => {
    // Clear cart exactly once
    if (!clearedRef.current) {
      clearCart();
      clearedRef.current = true;
    }
  }, [clearCart]);

  useEffect(() => {
    async function run() {
      if (!sessionId) return;

      try {
        const res = await fetch(`/.netlify/functions/get-checkout-session?session_id=${encodeURIComponent(sessionId)}`);
        const data = (await res.json()) as VerifyResponse;
        setVerify(data);
      } catch {
        setVerify({ ok: false, error: "Could not verify payment status." });
      } finally {
        setVerifying(false);
      }
    }

    run();
  }, [sessionId]);

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold">Payment Successful</h1>
        <p className="mt-2 text-muted-foreground">
          Thanks — we received your order. If you need urgent install/service, contact FleetForge.
        </p>

        <Card className="mt-8">
          <CardContent className="p-6 space-y-3">
            {sessionId ? (
              <>
                <div className="text-sm text-muted-foreground">Session:</div>
                <div className="break-all font-mono text-xs">{sessionId}</div>
              </>
            ) : null}

            {verifying ? (
              <div className="text-sm">Verifying payment status…</div>
            ) : verify ? (
              verify.ok ? (
                <div className="space-y-1">
                  <div className="text-sm">
                    Status: <span className="font-semibold">{verify.payment_status}</span>
                  </div>
                  {formatUSDFromCents(verify.amount_total, verify.currency) ? (
                    <div className="text-sm">
                      Amount: <span className="font-semibold">{formatUSDFromCents(verify.amount_total, verify.currency)}</span>
                    </div>
                  ) : null}
                  {verify.customer_email ? (
                    <div className="text-sm">
                      Receipt email: <span className="font-semibold">{verify.customer_email}</span>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm">
                  {verify.error}
                </div>
              )
            ) : (
              <div className="text-sm text-muted-foreground">
                Payment complete. (No session verification info available.)
              </div>
            )}

            <div className="pt-4 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="w-full">
                <Link to="/parts">Back to Parts</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Contact FleetForge</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
