import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="gradient-navy section-padding">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Get Your Fleet Serviced?
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Whether you need a one-time repair or ongoing fleet maintenance, we're
          here to help. Request a quote today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-orange-hover text-accent-foreground text-lg px-8"
          >
            <Link to="/contact">
              Request a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8"
          >
            <a href="tel:+15712062249">
              <Phone className="mr-2 h-5 w-5" />
              (571) 206-2249
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
