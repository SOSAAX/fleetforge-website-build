import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ServiceCards from "@/components/home/ServiceCards";
import FleetContracts from "@/components/home/FleetContracts";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>
          Mobile Truck Repair, Maintenance & Detailing | Northern Virginia |
          FleetForge Truck Solutions
        </title>
        <meta
          name="description"
          content="Professional mobile truck repair, maintenance, and detailing services in Northern Virginia (Loudoun & Fairfax). Fleet contracts available. Fast response, insured, professional invoicing."
        />
        <meta
          name="keywords"
          content="mobile truck repair Northern Virginia, fleet maintenance Northern VA, mobile truck detailing, yard truck service, truck parts sourcing"
        />
        <link rel="canonical" href="https://fleetforgetrucks.com" />
      </Helmet>
      <Layout>
        <Hero />
        <ServiceCards />
        <FleetContracts />
        <Testimonials />
        <FAQ />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
