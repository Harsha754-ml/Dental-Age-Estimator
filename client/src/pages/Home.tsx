import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import UploadCard from "@/components/UploadCard";
import HowItWorks from "@/components/HowItWorks";
import TechnologySection from "@/components/TechnologySection";
import ApplicationsSection from "@/components/ApplicationsSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollToUpload = () => {
    const uploadSection = document.querySelector("#upload-section");
    uploadSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onUploadClick={scrollToUpload} />
      
      <main>
        <HeroSection onUploadClick={scrollToUpload} />
        
        <section id="upload-section" className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start Your Analysis
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your panoramic dental X-ray and get instant AI-powered 
                age estimation results.
              </p>
            </div>
            <UploadCard />
            <p className="text-center text-sm text-muted-foreground mt-6">
              Your images are processed securely and never stored permanently.
            </p>
          </div>
        </section>
        
        <HowItWorks />
        
        <TechnologySection />
        
        <ApplicationsSection />
        
        <StatsSection />
      </main>
      
      <Footer />
    </div>
  );
}
