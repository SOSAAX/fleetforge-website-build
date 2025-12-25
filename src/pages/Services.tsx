import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Wrench,
  Sparkles,
  CheckCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CTASection from "@/components/home/CTASection";
import serviceVanImage from "@/assets/service-van.jpg";
import truckDetailingImage from "@/assets/truck-detailing.jpg";

const repairServices = [
  "Brake inspections & repairs",
  "Electrical diagnostics & repair",
  "Lighting & wiring issues",
  "Air system repairs (lines, fittings, valves)",
  "Preventive maintenance (PM) services",
  "Fluid changes & filter replacements",
  "Battery testing & replacement",
  "Minor engine diagnostics",
  "DEF system service",
  "General troubleshooting",
];

const detailingServices = [
  "Full exterior wash (tractor & trailer)",
  "Cab interior deep cleaning",
  "Deodorizing & sanitizing",
  "Dashboard & console cleaning",
  "Window cleaning (interior & exterior)",
  "Wheel & tire cleaning",
  "Optional: polish & brightwork",
  "Fleet wash programs available",
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>
          Mobile Truck Repair & Detailing Services | FleetForge Truck Solutions
        </title>
        <meta
          name="description"
          content="Comprehensive mobile truck repair, maintenance, and detailing services in Northern Virginia. On-site service for fleets, yards, and owner-operators."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="gradient-navy py-20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Our Services
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Professional mobile trucking services delivered to your
                location—no tow required. We handle repairs, maintenance, and
                detailing on-site.
              </p>
            </div>
          </div>
        </section>

        {/* Mobile Repair & Maintenance */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Wrench className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    Mobile Repair & Maintenance
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  We bring professional truck repair and maintenance directly to
                  your yard or location. Our mobile service means less downtime
                  for your fleet and no expensive towing costs.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {repairServices.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>

                <Card className="bg-muted border-border mb-6">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground mb-1">
                          Major Engine/Transmission Work
                        </p>
                        <p className="text-sm text-muted-foreground">
                          For major engine or transmission repairs that require
                          a shop environment, we can coordinate referrals to
                          trusted partners and help manage the process for you.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  asChild
                  className="bg-accent hover:bg-orange-hover text-accent-foreground"
                >
                  <Link to="/contact">
                    Schedule Service
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={serviceVanImage}
                  alt="FleetForge mobile service van"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Detailing */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={truckDetailingImage}
                  alt="Professional truck detailing service"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Sparkles className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    Mobile Truck Detailing
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  Keep your fleet looking professional with our mobile detailing
                  services. We clean tractors and trailers on-site—perfect for
                  maintaining your company's image.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {detailingServices.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>

                <Card className="bg-card border-border mb-6">
                  <CardHeader>
                    <h3 className="font-bold text-foreground">
                      Fleet Wash Programs
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Need regular detailing for your fleet? Ask about our
                      scheduled wash programs with contract pricing. Keep every
                      truck looking sharp without the hassle.
                    </p>
                  </CardContent>
                </Card>

                <Button
                  asChild
                  className="bg-accent hover:bg-orange-hover text-accent-foreground"
                >
                  <Link to="/contact">
                    Get a Detailing Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </Layout>
    </>
  );
};

export default Services;
