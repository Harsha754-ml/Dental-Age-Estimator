import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, FileText, ZoomIn, RotateCcw } from "lucide-react";
import heroImage from "@assets/generated_images/dental_x-ray_with_ai_overlay.png";

// todo: remove mock functionality
const mockResults = {
  estimatedAge: 14.7,
  ageRange: { min: 13.8, max: 15.6 },
  confidence: 94.2,
  analyzedTeeth: [
    { tooth: "Lower Left 7 (37)", stage: "F", score: 96 },
    { tooth: "Lower Left 6 (36)", stage: "G", score: 92 },
    { tooth: "Lower Left 5 (35)", stage: "G", score: 89 },
    { tooth: "Lower Right 7 (47)", stage: "F", score: 94 },
  ],
  features: {
    rootLength: "Equal to crown height",
    crownFormation: "Complete",
    apexClosure: "Partially open",
    eruptionStatus: "Fully erupted",
  },
};

export default function ResultsPreview() {
  const [showResults, setShowResults] = useState(true);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Sample Analysis</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Analysis Results Preview
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our system presents detailed analysis results with 
            visualization overlays and comprehensive reporting.
          </p>
        </div>

        {showResults && (
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
                  <CardTitle className="text-lg">X-Ray Analysis</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" data-testid="button-zoom">
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" data-testid="button-reset">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative rounded-md overflow-hidden">
                    <img 
                      src={heroImage} 
                      alt="Analyzed dental X-ray with detection overlay" 
                      className="w-full h-auto"
                      data-testid="img-results-xray"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                      <Badge className="bg-primary/90">Tooth 37 Detected</Badge>
                      <Badge className="bg-primary/90">Tooth 36 Detected</Badge>
                      <Badge className="bg-primary/90">Tooth 47 Detected</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Developmental Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {Object.entries(mockResults.features).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <span className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <p className="text-sm opacity-80 mb-2">Estimated Dental Age</p>
                  <p className="text-5xl font-bold mb-2">{mockResults.estimatedAge}</p>
                  <p className="text-sm opacity-80">years old</p>
                  <div className="mt-4 pt-4 border-t border-primary-foreground/20">
                    <p className="text-sm">
                      Range: {mockResults.ageRange.min} - {mockResults.ageRange.max} years
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between gap-4">
                    <span>Confidence Score</span>
                    <span className="text-primary">{mockResults.confidence}%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={mockResults.confidence} className="h-3" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tooth Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockResults.analyzedTeeth.map((tooth) => (
                    <div 
                      key={tooth.tooth} 
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                    >
                      <div>
                        <p className="text-sm font-medium">{tooth.tooth}</p>
                        <p className="text-xs text-muted-foreground">Stage {tooth.stage}</p>
                      </div>
                      <Badge variant="secondary">{tooth.score}%</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Button className="w-full gap-2" size="lg" data-testid="button-download-report">
                <Download className="w-4 h-4" />
                Download PDF Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
