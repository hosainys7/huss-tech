import React, { useEffect, useState } from "react";
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

type LandingPageProps = {
  initialSection?: string;
};

export default function LandingPage({ initialSection }: LandingPageProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  useEffect(() => {
    if (!initialSection) return;
    const section = document.getElementById(initialSection);
    if (section) {
      window.requestAnimationFrame(() => section.scrollIntoView());
    }
  }, [initialSection]);

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
      {/*
        Fixed gradient strip — sits just below the nav.
        As content scrolls up it dissolves smoothly into the dark background.
        Single effect, whole page, zero JS overhead.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "75px",
          left: 0,
          right: 0,
          height: "110px",
          background:
            "linear-gradient(to bottom, #080808 0%, rgba(8,8,8,0.88) 30%, rgba(8,8,8,0.5) 60%, rgba(8,8,8,0.12) 85%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 38,
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
