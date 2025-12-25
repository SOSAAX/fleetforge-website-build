import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Fleet Contracts", path: "/fleet-contracts" },
    { name: "Parts & Supplies", path: "/parts" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50 border-b border-border">
      <div className="container-custom">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-end py-2 border-b border-border text-sm">
          <a
            href="tel:+15712062249"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>(571) 206-2249</span>
          </a>
          <span className="mx-4 text-border">|</span>
          <span className="text-muted-foreground">
            Mon–Sat 9AM–7PM • After-hours by appt
          </span>
        </div>

        {/* Main nav */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">
                FleetForge
              </span>
              <span className="hidden sm:inline text-xl font-bold text-accent ml-1">
                Truck Solutions
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button asChild variant="outline">
              <a href="tel:+15712062249">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </a>
            </Button>
            <Button asChild className="bg-accent hover:bg-orange-hover text-accent-foreground">
              <Link to="/contact">Request a Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 hover:bg-muted rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Button asChild variant="outline" className="w-full">
                  <a href="tel:+15712062249">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                </Button>
                <Button asChild className="w-full bg-accent hover:bg-orange-hover text-accent-foreground">
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    Request a Quote
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
