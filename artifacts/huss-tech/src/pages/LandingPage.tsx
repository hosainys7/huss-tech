import React from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ServiceSelector from "@/components/ServiceSelector";
import WhyHussTech from "@/components/WhyHussTech";
import Availability from "@/components/Availability";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">
        <Hero />
        <ServiceSelector />
        <WhyHussTech />
        <Availability />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
