import React, { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ServiceSelector from "@/components/ServiceSelector";
import WhyHussTech from "@/components/WhyHussTech";
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

  function handleCategorySelect(categoryId: string) {
    if (selectedCategoryId === categoryId) return;
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(null);
    setSelectedOptionId(null);
  }

  function handleSubCategorySelect(subCategoryId: string) {
    if (selectedSubCategoryId === subCategoryId) return;
    setSelectedSubCategoryId(subCategoryId);
    setSelectedOptionId(null);
  }

  function handleOptionSelect(optionId: string) {
    setSelectedOptionId(optionId || null);
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
        <div id="home">
          <Hero />
        </div>
        <ServiceSelector
          selectedCategoryId={selectedCategoryId}
          selectedSubCategoryId={selectedSubCategoryId}
          selectedOptionId={selectedOptionId}
          onCategorySelect={handleCategorySelect}
          onSubCategorySelect={handleSubCategorySelect}
          onOptionSelect={handleOptionSelect}
          onReset={handleReset}
        />
        <WhyHussTech />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
