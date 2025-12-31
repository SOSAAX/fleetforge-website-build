import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccess() {
  return (
    <Layout>
      <Helmet>
        <title>Order Confirmed | FleetForge</title>
      </Helmet>

      <div className="mx-auto max-w-2xl px-4 py-12">
        <Card className="rounded-2xl">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-semibold">Payment successful</h1>
                <p className="mt-2 text-sm opacity-80">
                  Thanks — your order was received. We’ll contact you shortly with the next steps.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link to="/parts">Back to Parts</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
