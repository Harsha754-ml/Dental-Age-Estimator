import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import HowItWorks from "@/components/HowItWorks";
import TechnologySection from "@/components/TechnologySection";
import ResultsPreview from "@/components/ResultsPreview";
import ApplicationsSection from "@/components/ApplicationsSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToResults = () => {
    const resultsSection = document.querySelector("#results-preview");
    resultsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onUploadClick={scrollToUpload} />
      
      <main>
        <HeroSection 
          onUploadClick={scrollToUpload} 
          onDemoClick={scrollToResults} 
        />
        
        <div ref={uploadSectionRef}>
          <UploadSection 
            onFileUpload={(file) => {
              console.log("File uploaded:", file.name);
              // todo: implement actual file upload logic
            }} 
          />
        </div>
        
        <HowItWorks />
        
        <TechnologySection />
        
        <div id="results-preview">
          <ResultsPreview />
        </div>
        
        <ApplicationsSection />
        
        <StatsSection />
      </main>
      
      <Footer />
    </div>
  );
}
