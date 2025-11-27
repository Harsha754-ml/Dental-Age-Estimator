import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import techImage from "@assets/generated_images/cnn_model_architecture_diagram.png";

const features = [
  "CNN/CNN-regression architecture for precise age prediction",
  "Detects mandibular left 7 and multiple lower teeth regions",
  "Analyzes root length, crown formation, and apex closure",
  "Classifies using Demirjian A-H developmental scale",
  "Trained on 8,000+ annotated panoramic images",
  "Provides confidence scores with every prediction",
];

const demirjianStages = [
  { stage: "A", description: "Initial cusp formation" },
  { stage: "B", description: "Crown outline visible" },
  { stage: "C", description: "Crown half complete" },
  { stage: "D", description: "Crown complete" },
  { stage: "E", description: "Root length < crown" },
  { stage: "F", description: "Root length = crown" },
  { stage: "G", description: "Walls parallel, apex open" },
  { stage: "H", description: "Apex closed" },
];

export default function TechnologySection() {
  return (
    <section id="technology" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <Card className="overflow-hidden">
                <img 
                  src={techImage} 
                  alt="CNN deep learning model architecture" 
                  className="w-full h-auto"
                  data-testid="img-technology"
                />
              </Card>
              <p className="text-sm text-muted-foreground text-center mt-3">
                Deep Learning Model Architecture
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-3 flex flex-col gap-8">
            <div>
              <Badge variant="secondary" className="mb-4">
                Advanced AI Technology
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powered by Deep Learning
              </h2>
              <p className="text-lg text-muted-foreground">
                Our intelligent system uses state-of-the-art convolutional neural networks 
                to analyze dental X-rays and provide accurate age estimations based on 
                tooth development stages.
              </p>
            </div>

            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Demirjian A-H Development Scale</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {demirjianStages.map((item) => (
                    <div 
                      key={item.stage} 
                      className="text-center p-3 bg-muted/50 rounded-md"
                    >
                      <span className="text-2xl font-bold text-primary">{item.stage}</span>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
