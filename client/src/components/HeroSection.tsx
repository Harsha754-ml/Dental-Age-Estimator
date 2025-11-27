import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@assets/generated_images/dental_x-ray_with_ai_overlay.png";

interface HeroSectionProps {
  onUploadClick?: () => void;
  onDemoClick?: () => void;
}

export default function HeroSection({ onUploadClick, onDemoClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium w-fit">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              AI-Powered Analysis
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Intelligent Dental Age{" "}
              <span className="text-primary">Estimation</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Advanced deep learning system for accurate dental age prediction using 
              panoramic OPG X-ray images. Essential for forensic science, pediatric 
              dentistry, and medico-legal investigations.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button 
                size="lg" 
                onClick={onUploadClick}
                className="gap-2"
                data-testid="button-upload-xray-hero"
              >
                Analyze X-Ray Image
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={onDemoClick}
                className="gap-2"
                data-testid="button-view-demo"
              >
                <Play className="w-4 h-4" />
                View Demo Analysis
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>JPG, PNG, TIF, DICOM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-border">
              <img 
                src={heroImage} 
                alt="AI-powered dental X-ray analysis visualization" 
                className="w-full h-auto"
                data-testid="img-hero-xray"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="bg-black/50 backdrop-blur-sm rounded-md px-3 py-2">
                  <p className="text-white text-xs font-medium">Detected: Mandibular Left 7</p>
                </div>
                <div className="bg-primary/90 backdrop-blur-sm rounded-md px-3 py-2">
                  <p className="text-primary-foreground text-xs font-medium">Confidence: 97.3%</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
