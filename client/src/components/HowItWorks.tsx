import { Card, CardContent } from "@/components/ui/card";
import { Upload, Brain, FileText, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload X-Ray",
    description: "Upload your panoramic OPG dental X-ray image in JPG, PNG, TIF, or DICOM format.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analysis",
    description: "Our CNN deep learning model detects teeth and extracts developmental features automatically.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Get Results",
    description: "Receive detailed age estimation with confidence scores and a downloadable PDF report.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to get accurate dental age estimation using our 
            advanced AI-powered analysis system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Card className="h-full hover-elevate">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 lg:-right-5 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-muted-foreground/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
