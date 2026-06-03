import React, { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TickerBanner from "@/components/TickerBanner";
import EcosystemSection from "@/components/EcosystemSection";
import ServiceSelector from "@/components/ServiceSelector";
import AboutHussTech from "@/components/AboutHussTech";
import ProcessSection from "@/components/ProcessSection";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  function handleServiceSelect(
    categoryId: string,
    subCategoryId: string | null,
    optionId: string | null
  ) {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(subCategoryId);
    setSelectedOptionId(optionId);
  }

  function handleReset() {
    setSelectedCategoryId(null);
    setSelectedSubCategoryId(null);
    setSelectedOptionId(null);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Scroll blur mask — blurs content exiting the top of the viewport */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          pointerEvents: "none",
          zIndex: 39,
          maskImage: "linear-gradient(to bottom, black 0%, black 28%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 28%, transparent 100%)",
        }}
      />
      <Nav onServiceSelect={handleServiceSelect} onReset={handleReset} />
      <main className="flex-1">
        <div id="home">
          <Hero />
          <TickerBanner />
        </div>
        <EcosystemSection />
        <ServiceSelector
          selectedCategoryId={selectedCategoryId}
          selectedSubCategoryId={selectedSubCategoryId}
          selectedOptionId={selectedOptionId}
          onReset={handleReset}
        />
        <AboutHussTech />
        <ProcessSection />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
