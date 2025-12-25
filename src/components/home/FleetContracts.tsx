import { Link } from "react-router-dom";
import {
  CalendarCheck,
  Clock,
  FileText,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: CalendarCheck,
    title: "Scheduled PMs",
    description:
      "Regular preventive maintenance visits on your schedule—we keep your fleet road-ready.",
  },
  {
    icon: Clock,
    title: "Priority Response",
    description:
      "Contract customers get priority scheduling and faster response times for repairs.",
  },
  {
    icon: FileText,
    title: "Monthly Invoicing",
    description:
      "Simplified billing with detailed monthly invoices—no surprises, easy accounting.",
  },
  {
    icon: ShieldCheck,
    title: "Predictable Service",
    description:
      "Consistent quality and reliable technicians you can count on every visit.",
  },
];

const FleetContracts = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-accent/10 text-accent font-semibold px-4 py-2 rounded-full mb-4">
              For Fleets & Yards
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Fleet & Yard Contract Programs
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Designed for trucking yards, small fleets, and owner-operators who
              need reliable, ongoing maintenance without the hassle. Lock in
              consistent service with predictable pricing.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-orange-hover text-accent-foreground"
            >
              <Link to="/fleet-contracts">
                Learn About Contract Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-muted p-6 rounded-xl border border-border card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-primary p-3 rounded-lg w-fit mb-4">
                  <benefit.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetContracts;
