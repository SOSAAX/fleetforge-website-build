import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Target,
  Clock,
  Award,
  MapPin,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CTASection from "@/components/home/CTASection";

const values = [
  {
    icon: Target,
    title: "Reliability",
    description:
      "We show up when we say we will, every time. Your fleet depends on it.",
  },
  {
    icon: Clock,
    title: "Fast Response",
    description:
      "Downtime costs money. We prioritize quick response times to get you back on the road.",
  },
  {
    icon: Award,
    title: "Quality Work",
    description:
      "Professional service with professional results. We take pride in every job.",
  },
  {
    icon: MapPin,
    title: "Local Service",
    description:
      "Based in Northern Virginia, serving Loudoun and Fairfax counties. We know the area.",
  },
];

const commitments = [
  "Licensed and fully insured",
  "Professional invoicing for easy accounting",
  "Clear communication on every job",
  "Fair, upfront pricing",
  "Flexible scheduling",
  "Fleet program options",
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | FleetForge Truck Solutions</title>
        <meta
          name="description"
          content="FleetForge Truck Solutions provides professional mobile truck repair, maintenance, and detailing in Northern Virginia. Licensed, insured, and locally owned."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="gradient-navy py-20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                About FleetForge Truck Solutions
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Professional mobile trucking services built on reliability,
                quality, and local expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  FleetForge Truck Solutions was founded with a simple goal:
                  provide Northern Virginia's trucking businesses with reliable,
                  professional mobile service they can count on.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  We know that downtime means lost revenue. That's why we bring
                  expert repair, maintenance, and detailing services directly to
                  your location—whether you're a large yard, a small fleet, or
                  an owner-operator.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our contract programs are designed for businesses that want
                  consistent, predictable service without the hassle of managing
                  multiple vendors or worrying about scheduling.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {values.map((value) => (
                  <Card
                    key={value.title}
                    className="bg-muted border-border card-hover"
                  >
                    <CardContent className="pt-6">
                      <div className="bg-accent/10 p-3 rounded-lg w-fit mb-4">
                        <value.icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Commitment to You
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                When you work with FleetForge, you can expect:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {commitments.map((commitment) => (
                  <div
                    key={commitment}
                    className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border"
                  >
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{commitment}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-primary p-4 rounded-full w-fit mx-auto mb-6">
                <MapPin className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Service Area
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                FleetForge Truck Solutions proudly serves the trucking
                businesses of Northern Virginia. Our primary service area
                includes:
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="bg-accent/10 text-accent font-semibold px-6 py-3 rounded-full text-lg">
                  Loudoun County
                </span>
                <span className="bg-accent/10 text-accent font-semibold px-6 py-3 rounded-full text-lg">
                  Fairfax County
                </span>
              </div>
              <p className="text-muted-foreground">
                As a mobile service, we come to you—no storefront, no tow
                required. Contact us to confirm service at your specific
                location.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding gradient-navy">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Work with FleetForge?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Whether you need a one-time repair or ongoing fleet maintenance,
              we're here to help.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-orange-hover text-accent-foreground"
            >
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
