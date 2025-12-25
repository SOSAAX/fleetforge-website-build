import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  Package,
  Filter,
  Lightbulb,
  Wind,
  Disc,
  Droplets,
  ArrowRight,
  Upload,
  CheckCircle,
  Wrench,
  Link2,
  CircleDot,
  Car,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import truckPartsImage from "@/assets/truck-parts.jpg";

const inStockEssentials = [
  { icon: Wind, name: "Airlines & Fittings" },
  { icon: Link2, name: "Glad Hands & Seals" },
  { icon: Lightbulb, name: "Lights (marker, trailer, headlights)" },
  { icon: CircleDot, name: "Brake Chambers / Slack Adjusters (common)" },
  { icon: Car, name: "Mudflaps & Hardware" },
  { icon: Droplets, name: "Wipers / Fluids / Basics" },
];

const partsWeSupply = [
  { icon: Filter, name: "Filters", description: "Oil, air, fuel, DEF filters" },
  {
    icon: Lightbulb,
    name: "Lights",
    description: "Headlights, marker lights, LEDs",
  },
  {
    icon: Wind,
    name: "Airlines & Fittings",
    description: "Hoses, connectors, valves",
  },
  {
    icon: Disc,
    name: "Brake Components",
    description: "Pads, shoes, drums, rotors",
  },
  {
    icon: Package,
    name: "Wipers & Mudflaps",
    description: "All sizes and styles",
  },
  {
    icon: Droplets,
    name: "Fluids & DEF",
    description: "Oil, coolant, DEF, additives",
  },
];

const Parts = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    vin: "",
    truckYear: "",
    truckMake: "",
    truckModel: "",
    partNeeded: "",
    urgency: "",
    deliveryPreference: "",
    additionalNotes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Parts request submitted! We'll get back to you with a quote shortly."
    );
  };

  return (
    <>
      <Helmet>
        <title>Truck Parts & Supplies | FleetForge Truck Solutions</title>
        <meta
          name="description"
          content="In-stock truck parts and supplies for fleets and owner-operators in Northern Virginia. Filters, lights, brake components, and more. Fast supply with VIN-based matching."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="gradient-navy py-20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Parts & Supplies
              </h1>
              <p className="text-xl text-primary-foreground/80">
                In-Stock Essentials + Fast Supply (VIN-based matching).
              </p>
            </div>
          </div>
        </section>

        {/* In-Stock Essentials */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                In-Stock Essentials (Common Items)
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We keep common maintenance items on hand and can supply most parts quickly. If you don't see it listed, request it and we'll quote fast.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {inStockEssentials.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 p-4 bg-muted rounded-lg"
                >
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="font-medium text-foreground">{item.name}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground mt-6 text-sm">
              In-stock items vary — call/text to confirm availability.
            </p>
          </div>
        </section>

        {/* Parts We Supply */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Parts We Supply
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  From basic maintenance items to specific replacement parts—we can supply what you need at competitive prices. All parts are quote-based for fleets and individual trucks.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {partsWeSupply.map((part) => (
                    <div
                      key={part.name}
                      className="flex items-start gap-3 p-4 bg-card rounded-lg"
                    >
                      <div className="bg-accent/10 p-2 rounded-lg">
                        <part.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {part.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {part.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-muted-foreground mt-6 text-sm">
                  Don't see what you need? Request any part—we can supply most truck components.
                </p>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={truckPartsImage}
                  alt="Truck parts and maintenance supplies"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Request Form */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Request a Part
                </h2>
                <p className="text-lg text-muted-foreground">
                  Tell us what you need and we'll get you a quote. The more
                  details you provide, the faster we can find the right part.
                </p>
              </div>

              <Card className="bg-card border-border">
                <CardContent className="pt-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Info */}
                    <div>
                      <h3 className="font-bold text-foreground mb-4">
                        Contact Information
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="businessName">Business Name</Label>
                          <Input
                            id="businessName"
                            value={formData.businessName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                businessName: e.target.value,
                              })
                            }
                            placeholder="Your company name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactName">Contact Name *</Label>
                          <Input
                            id="contactName"
                            required
                            value={formData.contactName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                contactName: e.target.value,
                              })
                            }
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="(555) 555-5555"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Truck Info */}
                    <div>
                      <h3 className="font-bold text-foreground mb-4">
                        Truck Information
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <Label htmlFor="vin">VIN (if available)</Label>
                          <Input
                            id="vin"
                            value={formData.vin}
                            onChange={(e) =>
                              setFormData({ ...formData, vin: e.target.value })
                            }
                            placeholder="Vehicle Identification Number"
                          />
                        </div>
                        <div>
                          <Label htmlFor="truckYear">Year *</Label>
                          <Input
                            id="truckYear"
                            required
                            value={formData.truckYear}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                truckYear: e.target.value,
                              })
                            }
                            placeholder="e.g., 2019"
                          />
                        </div>
                        <div>
                          <Label htmlFor="truckMake">Make *</Label>
                          <Input
                            id="truckMake"
                            required
                            value={formData.truckMake}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                truckMake: e.target.value,
                              })
                            }
                            placeholder="e.g., Freightliner"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="truckModel">Model *</Label>
                          <Input
                            id="truckModel"
                            required
                            value={formData.truckModel}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                truckModel: e.target.value,
                              })
                            }
                            placeholder="e.g., Cascadia"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Part Info */}
                    <div>
                      <h3 className="font-bold text-foreground mb-4">
                        Part Request
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="partNeeded">
                            Part(s) Needed * (describe as much as possible)
                          </Label>
                          <Textarea
                            id="partNeeded"
                            required
                            rows={4}
                            value={formData.partNeeded}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                partNeeded: e.target.value,
                              })
                            }
                            placeholder="Describe the part(s) you need, part numbers if known, quantity, etc."
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="urgency">Urgency</Label>
                            <Select
                              value={formData.urgency}
                              onValueChange={(value) =>
                                setFormData({ ...formData, urgency: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="How soon do you need it?" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="urgent">
                                  Urgent (ASAP)
                                </SelectItem>
                                <SelectItem value="soon">
                                  Soon (within a week)
                                </SelectItem>
                                <SelectItem value="standard">
                                  Standard (no rush)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="deliveryPreference">
                              Delivery Preference
                            </Label>
                            <Select
                              value={formData.deliveryPreference}
                              onValueChange={(value) =>
                                setFormData({
                                  ...formData,
                                  deliveryPreference: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="How do you want it?" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="deliver">
                                  Deliver to my location
                                </SelectItem>
                                <SelectItem value="pickup">
                                  I'll pick up
                                </SelectItem>
                                <SelectItem value="install">
                                  Deliver + Install
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="photo">
                            Photo (optional - helps with identification)
                          </Label>
                          <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer">
                            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Drag and drop a photo, or click to browse
                            </p>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="additionalNotes">
                            Additional Notes
                          </Label>
                          <Textarea
                            id="additionalNotes"
                            rows={2}
                            value={formData.additionalNotes}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                additionalNotes: e.target.value,
                              })
                            }
                            placeholder="Any other details that might help"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-orange-hover text-accent-foreground"
                    >
                      Get a Parts Quote
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Installation Callout */}
              <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg flex items-start gap-3">
                <Wrench className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-foreground font-medium">
                  Need installation? We can install parts during your service call.
                </p>
              </div>

              <div className="mt-4 flex items-start gap-3 text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  We'll review your request and get back to you with pricing and
                  availability—usually within a few hours during business hours.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Parts;
