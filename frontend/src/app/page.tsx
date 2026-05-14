import { Suspense } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { PredictionInterface } from "@/components/sections/PredictionInterface";
import { ModelInsights } from "@/components/sections/ModelInsights";
import { EngineeringSection } from "@/components/sections/EngineeringSection";
import { LimitationsSection } from "@/components/sections/LimitationsSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { NavBar } from "@/components/ui/NavBar";

// This is a Server Component — zero client JS overhead for static sections
export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NavBar />

      {/* Hero — pure server render */}
      <HeroSection />

      {/* Prediction Interface — lazy-loaded Client Component */}
      <section id="playground" className="relative">
        <Suspense fallback={<InterfaceSkeleton />}>
          <PredictionInterface />
        </Suspense>
      </section>

      {/* Model Insights — server render */}
      <ModelInsights />

      {/* Engineering learnings — server render */}
      <EngineeringSection />

      {/* Limitations — server render */}
      <LimitationsSection />

      <FooterSection />
    </main>
  );
}

function InterfaceSkeleton() {
  return (
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="shimmer h-12 w-64 rounded" />
        <div className="shimmer h-40 w-full rounded-lg" />
        <div className="shimmer h-12 w-48 rounded" />
      </div>
    </div>
  );
}
