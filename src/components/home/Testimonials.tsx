import { Star, MessageSquarePlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Mike Richardson",
    company: "Richardson Trucking, LLC",
    text: "FleetForge has been handling our fleet maintenance for 6 months now. Fast response, fair pricing, and they always show up when they say they will.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    company: "Loudoun Logistics",
    text: "We switched to their contract program and haven't looked back. The monthly invoicing makes accounting so much easier, and our trucks are always in top shape.",
    rating: 5,
  },
  {
    name: "James Walker",
    company: "Owner-Operator",
    text: "Great service for independent drivers like me. They came out same-day when my truck broke down and got me back on the road fast.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding gradient-steel">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Trusted by fleets and owner-operators across Northern Virginia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="bg-card border-border card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-card p-8 rounded-xl border border-border">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Had a great experience with FleetForge?
          </h3>
          <p className="text-muted-foreground mb-4">
            We'd love to hear from you! Leave us a review on Google.
          </p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <MessageSquarePlus className="mr-2 h-5 w-5" />
            Leave a Review
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
