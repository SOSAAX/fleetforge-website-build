import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What areas do you service?",
    answer:
      "We provide mobile trucking services throughout Northern Virginia, specifically Loudoun County and Fairfax County. We travel to your location—whether it's a trucking yard, commercial property, or other accessible site.",
  },
  {
    question: "How do I schedule a service appointment?",
    answer:
      "You can request a quote or schedule service by calling us at (571) 206-2249, emailing info@fleetforgetrucks.com, or using the contact form on our website. We typically respond within a few hours during business hours.",
  },
  {
    question: "Do you offer after-hours or emergency service?",
    answer:
      "Yes, we offer after-hours service by appointment. For urgent needs outside our regular hours (Mon–Sat 9AM–7PM), please text us first at (571) 206-2249 and we'll do our best to accommodate you.",
  },
  {
    question: "Can you handle major engine or transmission repairs?",
    answer:
      "Our mobile services cover most common repairs and maintenance. For major engine or transmission work that requires a shop environment, we can coordinate referrals to trusted partners and help manage the process.",
  },
  {
    question: "How do I order parts through FleetForge?",
    answer:
      "We offer quote-based parts sourcing for fleets and owner-operators. Simply submit a parts request through our website or call us with your truck's year, make, model (and VIN if available), and the parts you need. We'll source quality parts at competitive prices.",
  },
  {
    question: "What's included in a fleet contract?",
    answer:
      "Our fleet contracts include scheduled preventive maintenance visits, priority response for repairs, monthly invoicing, and consistent service quality. Programs are customized based on fleet size and needs. Contact us for a custom quote.",
  },
];

const FAQ = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about our services
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-muted border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
