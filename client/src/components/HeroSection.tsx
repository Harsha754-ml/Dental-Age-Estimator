import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import heroImage from "@assets/generated_images/dental_x-ray_with_ai_overlay.png";

interface HeroSectionProps {
  onUploadClick?: () => void;
}

export default function HeroSection({ onUploadClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Analysis
              </Badge>
              <Badge variant="outline" className="gap-1.5 py-1.5 px-3">
                <Shield className="w-3.5 h-3.5" />
                HIPAA Compliant
              </Badge>
            </div>
            
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Intelligent Dental Age{" "}
                <span className="text-primary relative">
                  Estimation
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6C50 2 150 2 198 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Advanced deep learning system for accurate dental age prediction using 
                panoramic OPG X-ray images. Essential for forensic science, pediatric 
                dentistry, and medico-legal investigations.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button 
                size="lg" 
                onClick={onUploadClick}
                className="gap-2 text-base h-12 px-8"
                data-testid="button-upload-xray-hero"
              >
                Upload X-Ray Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={onUploadClick}
                className="gap-2 text-base h-12 px-8"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Results in seconds</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Secure processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">97%+ accuracy</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
              <img 
                src={heroImage} 
                alt="AI-powered dental X-ray analysis visualization" 
                className="w-full h-auto"
                data-testid="img-hero-xray"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2">
                    <p className="text-white text-xs mb-0.5 opacity-80">Detected Region</p>
                    <p className="text-white text-sm font-semibold">Mandibular Left 7</p>
                  </div>
                  <div className="bg-primary rounded-lg px-4 py-2">
                    <p className="text-primary-foreground text-xs mb-0.5 opacity-80">Confidence</p>
                    <p className="text-primary-foreground text-sm font-bold">97.3%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -z-10 -top-6 -right-6 w-full h-full rounded-2xl bg-primary/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
