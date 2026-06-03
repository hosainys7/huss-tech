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
import ScrollBlurSection from "@/components/ScrollBlurSection";

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
      <Nav onServiceSelect={handleServiceSelect} onReset={handleReset} />
      <main className="flex-1">
        <ScrollBlurSection>
          <div id="home">
            <Hero />
            <TickerBanner />
          </div>
        </ScrollBlurSection>

        <ScrollBlurSection>
          <EcosystemSection />
        </ScrollBlurSection>

        <ScrollBlurSection>
          <ServiceSelector
            selectedCategoryId={selectedCategoryId}
            selectedSubCategoryId={selectedSubCategoryId}
            selectedOptionId={selectedOptionId}
            onReset={handleReset}
          />
        </ScrollBlurSection>

        <ScrollBlurSection>
          <AboutHussTech />
        </ScrollBlurSection>

        <ScrollBlurSection>
          <ProcessSection />
        </ScrollBlurSection>

        <ScrollBlurSection>
          <Contact />
        </ScrollBlurSection>

        <ScrollBlurSection>
          <FAQ />
        </ScrollBlurSection>
      </main>
      <Footer />
    </div>
  );
}
