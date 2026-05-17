import React from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import WhyHussTech from "@/components/WhyHussTech";
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
