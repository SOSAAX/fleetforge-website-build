import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  CalendarCheck,
  Clock,
  FileText,
  ShieldCheck,
  Users,
  Truck,
  User,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const benefits = [
  {
    icon: CalendarCheck,
    title: "Scheduled PM Visits",
    description:
      "Regular preventive maintenance on a schedule that works for you. We track service intervals and show up when your trucks need attention.",
  },
  {
    icon: Clock,
    title: "Priority Response",
    description:
      "Contract customers jump to the front of the line. When you have an urgent repair, we prioritize your call.",
  },
  {
    icon: FileText,
    title: "Monthly Invoicing",
    description:
      "Simplified accounting with detailed monthly invoices. Know exactly what you're spending with no surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Consistent Quality",
    description:
      "Same professional technicians every visit. Build a relationship with techs who know your equipment.",
  },
];

const audiences = [
  {
    icon: Users,
    title: "Trucking Yards",
    description:
      "Keep your yard trucks running smoothly with scheduled service visits and priority repairs.",
  },
  {
    icon: Truck,
    title: "Small Fleets",
    description:
      "Ideal for fleets of 3-20 trucks. Predictable maintenance costs and professional service.",
  },
  {
    icon: User,
    title: "Owner-Operators",
    description:
      "Individual owners benefit from priority response and consistent pricing on regular maintenance.",
  },
];

const included = [
  "Scheduled preventive maintenance visits",
  "On-site repair services",
  "Priority scheduling for urgent repairs",
  "Detailed service records for each unit",
  "Monthly consolidated invoicing",
  "Optional detailing schedules",
  "Parts sourcing support",
  "Dedicated service coordination",
];

const FleetContracts = () => {
  return (
    <>
      <Helmet>
        <title>
          Fleet & Yard Contract Programs | FleetForge Truck Solutions
        </title>
        <meta
          name="description"
          content="Fleet maintenance contracts for trucking yards, small fleets, and owner-operators in Northern Virginia. Scheduled PMs, priority response, monthly invoicing."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="gradient-navy py-20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <div className="inline-block bg-accent/20 text-accent font-semibold px-4 py-2 rounded-full mb-4">
                For Fleets & Yards
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Fleet & Yard Contract Programs
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Lock in reliable maintenance with predictable pricing. Our
                contract programs are designed for yards, small fleets, and
                owner-operators who need consistent, professional service.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-orange-hover text-accent-foreground"
              >
                <Link to="/contact">
                  Request Contract Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Who Contract Programs Are For
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our contracts are tailored to meet the needs of different
                operations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {audiences.map((audience) => (
                <Card
                  key={audience.title}
                  className="bg-muted border-border text-center card-hover"
                >
                  <CardContent className="pt-8 pb-8">
                    <div className="bg-primary p-4 rounded-full w-fit mx-auto mb-4">
                      <audience.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {audience.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {audience.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Contract Benefits
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Why fleets choose to work with us on contract
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit) => (
                <Card
                  key={benefit.title}
                  className="bg-card border-border card-hover"
                >
                  <CardContent className="pt-6 flex gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg h-fit">
                      <benefit.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  What's Included
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Every contract is customized based on your fleet size and
                  needs. Here's what our programs typically include:
                </p>
                <div className="grid gap-3">
                  {included.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="bg-primary border-none">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-primary-foreground">
                    Get Custom Contract Pricing
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/80 mb-6">
                    Every fleet is different. Let us know about your operation
                    and we'll put together a contract that fits your needs and
                    budget.
                  </p>
                  <ul className="text-primary-foreground/80 space-y-2 mb-6">
                    <li>• How many trucks in your fleet?</li>
                    <li>• What services do you need most?</li>
                    <li>• How often do you want scheduled visits?</li>
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-accent hover:bg-orange-hover text-accent-foreground"
                  >
                    <Link to="/contact">
                      Request Contract Pricing
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default FleetContracts;
