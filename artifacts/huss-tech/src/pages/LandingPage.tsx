import React, { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ServiceSelector from "@/components/ServiceSelector";
import WhyHussTech from "@/components/WhyHussTech";
import Availability from "@/components/Availability";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  function handleServiceSelect(categoryId: string, optionId: string) {
    setSelectedCategoryId(categoryId);
    setSelectedOptionId(optionId);
  }

  function handleCategorySelect(categoryId: string) {
    if (selectedCategoryId === categoryId) return;
    setSelectedCategoryId(categoryId);
    setSelectedOptionId(null);
  }

  function handleOptionSelect(optionId: string) {
    setSelectedOptionId(optionId || null);
  }

  function handleReset() {
    setSelectedCategoryId(null);
    setSelectedOptionId(null);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav
        onServiceSelect={handleServiceSelect}
        onReset={handleReset}
      />
      <main className="flex-1">
        <div id="home">
          <Hero />
        </div>
        <ServiceSelector
          selectedCategoryId={selectedCategoryId}
          selectedOptionId={selectedOptionId}
          onCategorySelect={handleCategorySelect}
          onOptionSelect={handleOptionSelect}
        />
        <WhyHussTech />
        <Availability />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
