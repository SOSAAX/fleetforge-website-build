import { Link } from "react-router-dom";
import { Wrench, Sparkles, Package, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import serviceVanImage from "@/assets/service-van.jpg";
import truckDetailingImage from "@/assets/truck-detailing.jpg";
import truckPartsImage from "@/assets/truck-parts.jpg";

const services = [
  {
    icon: Wrench,
    title: "Mobile Repair & Maintenance",
    description:
      "On-site diagnostics, repairs, and preventive maintenance. We come to your yard or location—no tow required.",
    image: serviceVanImage,
    link: "/services",
  },
  {
    icon: Sparkles,
    title: "Mobile Truck Detailing",
    description:
      "Complete exterior wash, cab interior cleaning, deodorizing, and optional polish services. Fleet wash programs available.",
    image: truckDetailingImage,
    link: "/services",
  },
  {
    icon: Package,
    title: "Parts & Sourcing",
    description:
      "We source quality truck parts—filters, lights, brake components, and more. Quote-based ordering for fleets.",
    image: truckPartsImage,
    link: "/parts",
  },
];

const ServiceCards = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive mobile trucking services designed to keep your fleet
            running smoothly and looking professional.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="bg-card border-border overflow-hidden card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <service.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
              <CardFooter>
                <Link
                  to={service.link}
                  className="text-accent font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
