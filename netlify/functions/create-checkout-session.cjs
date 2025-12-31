// netlify/functions/create-checkout-session.cjs
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

function getBaseUrl(event) {
  // Netlify sets these in production
  if (process.env.URL) return process.env.URL;
  if (process.env.DEPLOY_PRIME_URL) return process.env.DEPLOY_PRIME_URL;

  // Fallback
  const host = event.headers.host;
  const proto = event.headers["x-forwarded-proto"] || "https";
  return `${proto}://${host}`;
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body || "{}");
    const items = Array.isArray(body.items) ? body.items : [];
    const customerEmail = body.customerEmail || undefined;

    if (!items.length) {
      return { statusCode: 400, body: JSON.stringify({ error: "Cart is empty." }) };
    }

    // items: [{ name, price, quantity, partNumber? }]
    const netSubtotalCents = items.reduce((sum, it) => {
      const priceCents = Math.round(Number(it.price) * 100);
      const qty = Math.max(1, Number(it.quantity) || 1);
      return sum + priceCents * qty;
    }, 0);

    // Goal: you receive netSubtotal after fees.
    // Using your same fee model:
    // Stripe processing ≈ 2.9% + 30¢, Documentation/Processing ≈ 0.4%
    // net = total - (0.029*total + 30) - (0.004*total)
    // net = total*(1 - 0.033) - 30 => total = (net + 30) / 0.967
    const totalCents = Math.round((netSubtotalCents + 30) / 0.967);

    // doc fee is 0.4% of total
    const docFeeCents = Math.round(totalCents * 0.004);

    // service fee becomes "whatever is left" so totals add up perfectly
    const serviceFeeCents = totalCents - netSubtotalCents - docFeeCents;

    const baseUrl = getBaseUrl(event);

    const line_items = [
      ...items.map((it) => {
        const qty = Math.max(1, Number(it.quantity) || 1);
        const unit_amount = Math.round(Number(it.price) * 100);

        return {
          quantity: qty,
          price_data: {
            currency: "usd",
            unit_amount,
            product_data: {
              name: it.partNumber ? `${it.name} (Part # ${it.partNumber})` : it.name,
            },
          },
        };
      }),
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: serviceFeeCents,
          product_data: { name: "Service & Handling" },
        },
      },
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: docFeeCents,
          product_data: { name: "Documentation & Processing" },
        },
      },
    ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customerEmail,
      // If they cancel, send them back to your cart so they can add/remove parts
      cancel_url: `${baseUrl}/cart`,
      // After payment, send to a success page (you can create it or change this)
      success_url: `${baseUrl}/success`,
      // Optional: collects phone in Checkout
      phone_number_collection: { enabled: true },

      // If your Stripe account/API version supports it, it helps with invoice-style docs.
      // If this errors in your Stripe dashboard logs, remove this block.
      invoice_creation: { enabled: true },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("create-checkout-session error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Server error" }),
    };
  }
};
