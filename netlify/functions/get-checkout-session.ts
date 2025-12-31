import type { Handler } from "@netlify/functions";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const handler: Handler = async (event) => {
  try {
    if (!stripeSecretKey) {
      return { statusCode: 500, body: JSON.stringify({ ok: false, error: "Missing STRIPE_SECRET_KEY" }) };
    }

    const sessionId = event.queryStringParameters?.session_id;
    if (!sessionId) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Missing session_id" }) };
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_details?.email || null,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: err?.message || "Failed to retrieve session" }),
    };
  }
};
