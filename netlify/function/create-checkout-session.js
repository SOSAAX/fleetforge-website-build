const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const body = JSON.parse(event.body || "{}");
    const { amountCents, customerEmail, description } = body;

    if (!amountCents || amountCents < 50) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid amount" }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      // creates a customer so Stripe can generate an invoice
      customer_creation: "always",
      customer_email: customerEmail || undefined,

      // ✅ this is what triggers the invoice PDF (the 0.4% fee feature)
      invoice_creation: { enabled: true },

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: description || "FleetForge Service" },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/checkout`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
