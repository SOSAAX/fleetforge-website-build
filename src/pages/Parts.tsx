import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

type InStockItem = {
  id: string;
  name: string;
  unitPrice: number; // dollars
  partNumber?: string;
  description?: string;
};

const IN_STOCK: InStockItem[] = [
  {
    id: "front-bumper",
    name: "Front Bumper",
    unitPrice: 660,
    partNumber: "FF-BMP-001",
    description: "Heavy-duty front bumper (in stock).",
  },
  {
    id: "headlight-right",
    name: "Headlight (Right)",
    unitPrice: 440,
    partNumber: "FF-HL-R-001",
    description: "OEM-style headlight assembly (right).",
  },
  {
    id: "headlight-left",
    name: "Headlight (Left)",
    unitPrice: 512,
    partNumber: "FF-HL-L-001",
    description: "OEM-style headlight assembly (left).",
  },
];

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function Parts() {
  const { addItem, itemCount } = useCart();

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Parts & Supplies</h1>
            <p className="text-muted-foreground">
              Buy a few in-stock items online, or request any part with VIN fitment verification.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link to="/cart">
              View Cart{itemCount > 0 ? ` (${itemCount})` : ""}
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {IN_STOCK.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    {p.partNumber ? (
                      <p className="text-sm text-muted-foreground">Part #: {p.partNumber}</p>
                    ) : null}
                  </div>
                  <div className="text-lg font-bold">{formatUSD(p.unitPrice)}</div>
                </div>

                {p.description ? (
                  <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
                ) : null}

                <div className="mt-5 flex gap-3">
                  <Button
                    className="w-full"
                    onClick={() =>
                      addItem(
                        {
                          id: p.id,
                          name: p.name,
                          unitPrice: p.unitPrice,
                          partNumber: p.partNumber,
                          quantity: 1, // CartContext can ignore this, but it won’t hurt
                        },
                        1
                      )
                    }
                  >
                    Add to Cart
                  </Button>

                  <Button asChild variant="outline" className="w-full">
                    <Link to="/checkout">Checkout</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-10">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Need a specific part?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Submit a request with your VIN and we’ll verify fitment + quote quickly.
            </p>
            <div className="mt-4">
              <Button asChild variant="secondary">
                <Link to="/contact">Request a Part (VIN-based)</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
