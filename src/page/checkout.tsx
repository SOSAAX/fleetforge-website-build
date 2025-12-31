import { useMemo, useState } from "react";

function dollarsToCents(v: string) {
  const n = Number(v);
  if (!isFinite(n) || n <= 0) return 0;
  return Math.round(n * 100);
}

function centsToDollars(cents: number) {
  return (cents / 100).toFixed(2);
}

// Covers:
// - Stripe card fee: 2.9% + 30¢
// - Invoice PDF fee: 0.4% (max $2)
function grossFromNet(netCentsWanted: number) {
  if (netCentsWanted <= 0) return 0;

  // invoice fee cap hits at $500 (0.4% * 500 = $2)
  // Case 1: gross < $500 => invoice fee = 0.4% of gross
  // net = gross*(1 - 0.029 - 0.004) - 30 = gross*0.967 - 30
  let gross = Math.ceil((netCentsWanted + 30) / 0.967);

  // If that pushes gross to >= $500, switch to capped invoice fee model
  if (gross >= 50000) {
    // Case 2: invoice fee capped at $2
    // net = gross*(1 - 0.029) - 30 - 200 = gross*0.971 - 230
    gross = Math.ceil((netCentsWanted + 230) / 0.971);

    // ensure we truly are in the capped region
    if (gross < 50000) gross = 50000;
  }

  return gross;
}

function feeBreakdown(grossCents: number) {
  const stripeFee = Math.round(grossCents * 0.029) + 30;
  const invoiceFee = Math.min(Math.round(grossCents * 0.004), 200);
  const totalFees = stripeFee + invoiceFee;
  const net = grossCents - totalFees;
  return { stripeFee, invoiceFee, totalFees, net };
}

export default function Checkout() {
  const [listedAmount, setListedAmount] = useState("199.00"); // what YOU want to receive
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("FleetForge Service");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const netCentsWanted = useMemo(() => dollarsToCents(listedAmount), [listedAmount]);
  const grossCents = useMemo(() => grossFromNet(netCentsWanted), [netCentsWanted]);
  const fees = useMemo(() => feeBreakdown(grossCents), [grossCents]);

  async function onPay() {
    setErr(null);

    if (!email.trim()) {
      setErr("Please enter your email (required for receipt/invoice).");
      return;
    }
    if (grossCents <= 0) {
      setErr("Enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountCents: grossCents,
          customerEmail: email.trim(),
          description: description.trim() || "FleetForge Service",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create checkout session");

      window.location.href = data.url; // redirect to Stripe Checkout
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 16, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Checkout</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Enter the amount you want to receive. We’ll calculate the customer total so you net the listed amount.
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        <label>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Customer email</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="customer@email.com"
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
          />
        </label>

        <label>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Service description</div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Mobile Truck Repair Deposit"
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
          />
        </label>

        <label>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Listed price (what you want to receive)</div>
          <input
            value={listedAmount}
            onChange={(e) => setListedAmount(e.target.value)}
            inputMode="decimal"
            placeholder="199.00"
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
          />
        </label>

        <div style={{ padding: 12, borderRadius: 12, border: "1px solid #e5e5e5", background: "#fafafa" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span>Customer pays</span>
            <strong>${centsToDollars(grossCents)}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#555" }}>
            <span>Stripe fee (est.)</span>
            <span>${centsToDollars(fees.stripeFee)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#555" }}>
            <span>Invoice PDF fee (est.)</span>
            <span>${centsToDollars(fees.invoiceFee)}</span>
          </div>
          <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", margin: "10px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>You receive (net)</span>
            <strong>${centsToDollars(fees.net)}</strong>
          </div>
          <div style={{ fontSize: 12, color: "#777", marginTop: 8 }}>
            Note: We do this by adjusting the total price — not by calling it “sales tax.”
          </div>
        </div>

        {err && <div style={{ color: "crimson", fontWeight: 600 }}>{err}</div>}

        <button
          onClick={onPay}
          disabled={loading}
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "none",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Redirecting…" : `Pay $${centsToDollars(grossCents)}`}
        </button>
      </div>
    </div>
  );
}
