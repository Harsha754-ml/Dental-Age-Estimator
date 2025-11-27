import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import UploadCard from "@/components/UploadCard";
import HowItWorks from "@/components/HowItWorks";
import TechnologySection from "@/components/TechnologySection";
import ApplicationsSection from "@/components/ApplicationsSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

// Wrapper component to animate sections on scroll
function AnimatedSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const scrollToUpload = () => {
    const uploadSection = document.querySelector("#upload-section");
    uploadSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Header onUploadClick={scrollToUpload} />
      </motion.div>
      
      <main>
        <AnimatedSection>
          <HeroSection onUploadClick={scrollToUpload} />
        </AnimatedSection>
        
        <section id="upload-section" className="py-16 md:py-24 bg-muted/30">
          <AnimatedSection>
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
          </AnimatedSection>
        </section>
        
        <AnimatedSection>
          <HowItWorks />
        </AnimatedSection>
        
        <AnimatedSection>
          <TechnologySection />
        </AnimatedSection>
        
        <AnimatedSection>
          <ApplicationsSection />
        </AnimatedSection>
        
        <AnimatedSection>
          <StatsSection />
        </AnimatedSection>
      </main>
      
      <Footer />
    </div>
  );
}