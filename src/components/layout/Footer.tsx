import { Link } from "react-router-dom";
import { Phone, Mail, Clock, MapPin, Wrench } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-navy text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent p-2 rounded-lg">
                <Wrench className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold">FleetForge</span>
                <span className="text-xl font-bold text-accent ml-1">
                  Truck Solutions
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Professional mobile truck repair, maintenance, and detailing
              services for Northern Virginia fleets and owner-operators.
            </p>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <span className="bg-accent/20 px-3 py-1 rounded-full text-sm">
                Licensed
              </span>
              <span className="bg-accent/20 px-3 py-1 rounded-full text-sm">
                Insured
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/services"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Our Services
              </Link>
              <Link
                to="/fleet-contracts"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Fleet & Yard Contracts
              </Link>
              <Link
                to="/parts"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Parts & Sourcing
              </Link>
              <Link
                to="/about"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Contact / Request Quote
              </Link>
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+15712062249"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>(571) 206-2249</span>
              </a>
              <a
                href="mailto:info@fleetforgetrucks.com"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>info@fleetforgetrucks.com</span>
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="h-5 w-5 mt-0.5" />
                <span>
                  Service Area: Northern Virginia
                  <br />
                  (Loudoun & Fairfax Counties)
                </span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-lg mb-4">Hours</h4>
            <div className="flex items-start gap-3 text-primary-foreground/80">
              <Clock className="h-5 w-5 mt-0.5" />
              <div>
                <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
                <p>Sunday: Closed</p>
                <p className="mt-2 text-sm text-accent">
                  After-hours by appointment
                  <br />
                  (text first)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>
            © {new Date().getFullYear()} FleetForge Truck Solutions, LLC. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
