import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-truck-service.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Professional mobile truck mechanic servicing a semi-truck"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy/60" />
      </div>

      {/* Content */}
      <div className="relative container-custom py-20">
        <div className="max-w-2xl animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
            Mobile Truck Repair, Maintenance & Detailing —{" "}
            <span className="text-accent">Northern Virginia</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
            Fast response. Professional service.{" "}
            <span className="text-accent font-semibold">
              Fleet & yard contract programs available.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-orange-hover text-accent-foreground text-lg px-8 py-6"
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
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6"
            >
              <a href="tel:+15712062249">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4">
            {["Mobile", "Insured", "Professional Invoicing", "Fleet Programs"].map(
              (badge) => (
                <div
                  key={badge}
                  className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 px-4 py-2 rounded-full text-primary-foreground text-sm font-medium"
                >
                  {badge}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
