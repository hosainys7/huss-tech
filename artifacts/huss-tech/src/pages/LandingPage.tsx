import React from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import WhyHussTech from "@/components/WhyHussTech";
import FAQ from "@/components/FAQ";
import Availability from "@/components/Availability";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Services />
        <Pricing />
        <WhyHussTech />
        <Availability />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
