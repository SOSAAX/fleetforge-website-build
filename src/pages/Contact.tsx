import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Phone, Mail, Clock, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const encode = (data: Record<string, string>) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    params.append(key, value);
  });
  return params.toString();
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    services: {
      repair: false,
      detailing: false,
      contract: false,
      parts: false,
    },
    message: "",
  });

  const handleServiceChange = (service: keyof typeof formData.services) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload: Record<string, string> = {
        "form-name": "request-quote",
        name: formData.name,
        businessName: formData.businessName,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,

        // checkbox values (Netlify will store these as fields)
        service_repair: formData.services.repair ? "Yes" : "No",
        service_detailing: formData.services.detailing ? "Yes" : "No",
        service_fleetContract: formData.services.contract ? "Yes" : "No",
        service_partsRequest: formData.services.parts ? "Yes" : "No",

        // honeypot field (should stay empty)
        "bot-field": "",
      };

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });

      toast.success("Thank you! Your request has been submitted. We'll be in touch soon.");

      // reset form
      setFormData({
        name: "",
        businessName: "",
        phone: "",
        email: "",
        services: { repair: false, detailing: false, contract: false, parts: false },
        message: "",
      });
    } catch (err) {
      toast.error("Submission failed. Please try again or call/text us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us / Request a Quote | FleetForge Truck Solutions</title>
        <meta
          name="description"
          content="Contact FleetForge Truck Solutions for mobile truck repair, maintenance, and detailing services in Northern Virginia. Call (571) 206-2249 or request a quote online."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="gradient-navy py-20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Contact Us / Request a Quote
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Ready to get started? Reach out by phone, email, or fill out the form below.
                We typically respond within a few hours during business hours.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>

                <div className="space-y-6">
                  <a
                    href="tel:+15712062249"
                    className="flex items-start gap-4 p-4 bg-muted rounded-lg hover:bg-accent/10 transition-colors group"
                  >
                    <div className="bg-accent/10 p-3 rounded-lg group-hover:bg-accent/20">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Phone</h3>
                      <p className="text-accent font-semibold">(571) 206-2249</p>
                      <p className="text-sm text-muted-foreground">Call or text</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@fleetforgetrucks.com"
                    className="flex items-start gap-4 p-4 bg-muted rounded-lg hover:bg-accent/10 transition-colors group"
                  >
                    <div className="bg-accent/10 p-3 rounded-lg group-hover:bg-accent/20">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Email</h3>
                      <p className="text-accent font-semibold">info@fleetforgetrucks.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Hours</h3>
                      <p className="text-foreground">Mon – Sat: 9AM – 7PM</p>
                      <p className="text-foreground">Sunday: Closed</p>
                      <p className="text-sm text-accent mt-1">
                        After-hours by appointment (text first)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Service Area</h3>
                      <p className="text-foreground">Northern Virginia</p>
                      <p className="text-muted-foreground">Loudoun & Fairfax Counties</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mobile service—we come to you
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="bg-muted border-border">
                  <CardHeader>
                    <h2 className="text-2xl font-bold text-foreground">Request a Quote</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you with pricing and availability.
                    </p>
                  </CardHeader>

                  <CardContent>
                    <form
                      name="request-quote"
                      method="POST"
                      data-netlify="true"
                      netlify-honeypot="bot-field"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <input type="hidden" name="form-name" value="request-quote" />
                      <p hidden>
                        <label>
                          Don’t fill this out: <input name="bot-field" />
                        </label>
                      </p>

                      {/* Hidden fields for checkbox values */}
                      <input type="hidden" name="service_repair" value={formData.services.repair ? "Yes" : "No"} />
                      <input type="hidden" name="service_detailing" value={formData.services.detailing ? "Yes" : "No"} />
                      <input type="hidden" name="service_fleetContract" value={formData.services.contract ? "Yes" : "No"} />
                      <input type="hidden" name="service_partsRequest" value={formData.services.parts ? "Yes" : "No"} />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Your Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Smith"
                          />
                        </div>

                        <div>
                          <Label htmlFor="businessName">Business Name</Label>
                          <Input
                            id="businessName"
                            name="businessName"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                            placeholder="Your company (optional)"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(555) 555-5555"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="mb-3 block">What services are you interested in?</Label>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="repair"
                              checked={formData.services.repair}
                              onCheckedChange={() => handleServiceChange("repair")}
                            />
                            <label
                              htmlFor="repair"
                              className="text-sm font-medium text-foreground cursor-pointer"
                            >
                              Repair / Maintenance
                            </label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="detailing"
                              checked={formData.services.detailing}
                              onCheckedChange={() => handleServiceChange("detailing")}
                            />
                            <label
                              htmlFor="detailing"
                              className="text-sm font-medium text-foreground cursor-pointer"
                            >
                              Detailing
                            </label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="contract"
                              checked={formData.services.contract}
                              onCheckedChange={() => handleServiceChange("contract")}
                            />
                            <label
                              htmlFor="contract"
                              className="text-sm font-medium text-foreground cursor-pointer"
                            >
                              Fleet / Yard Contract
                            </label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="parts"
                              checked={formData.services.parts}
                              onCheckedChange={() => handleServiceChange("parts")}
                            />
                            <label
                              htmlFor="parts"
                              className="text-sm font-medium text-foreground cursor-pointer"
                            >
                              Parts Request
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Tell us about your needs *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Describe what you need—number of trucks, types of service, location, timeline, etc."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-accent hover:bg-orange-hover text-accent-foreground"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="mt-6 flex items-start gap-3 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    We typically respond within a few hours during business hours. For urgent needs,
                    please call us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
