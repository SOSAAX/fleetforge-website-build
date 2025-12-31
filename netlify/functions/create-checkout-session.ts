import type { Handler } from "@netlify/functions";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
    }

    if (!stripeSecretKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "Missing STRIPE_SECRET_KEY" }) };
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" });

    const body = event.body ? JSON.parse(event.body) : {};
    const items = Array.isArray(body.items) ? body.items : [];

    if (items.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Cart is empty" }) };
    }

    const origin =
      event.headers.origin ||
      `https://${event.headers.host}` ||
      "http://localhost:8888";

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((i: any) => {
      const name = String(i.name || "").slice(0, 100);
      const unitPrice = Number(i.unitPrice);
      const quantity = Math.max(1, Math.floor(Number(i.quantity) || 1));

      if (!name || !Number.isFinite(unitPrice) || unitPrice <= 0) {
        throw new Error("Invalid cart item");
      }

      // Stripe expects cents
      const unit_amount = Math.round(unitPrice * 100);

      return {
        quantity,
        price_data: {
          currency: "usd",
          unit_amount,
          product_data: {
            name,
            metadata: {
              id: String(i.id || ""),
              partNumber: String(i.partNumber || ""),
            },
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      metadata: {
        business: "FleetForge Truck Solutions",
        source: "website_cart_v1",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err?.message || "Failed to create checkout session" }),
    };
  }
};
