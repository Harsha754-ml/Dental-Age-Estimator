import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  ZoomIn, 
  RotateCcw, 
  CheckCircle2,
  FileText,
  Clock,
  Scan
} from "lucide-react";
import { useUpload } from "@/context/UploadContext";

export default function Results() {
  const [, setLocation] = useLocation();
  const { session, clearSession } = useUpload();

  useEffect(() => {
    if (!session.analysisComplete || !session.result) {
      setLocation("/");
    }
  }, [session.analysisComplete, session.result, setLocation]);

  if (!session.result) {
    return null;
  }

  const { result } = session;

  const handleNewAnalysis = () => {
    clearSession();
    setLocation("/");
  };

  const handleDownloadReport = () => {
    // todo: implement actual PDF generation
    console.log("Downloading PDF report...");
    alert("PDF Report download started! (Demo)");
  };

  const handleShare = () => {
    // todo: implement share functionality
    console.log("Sharing results...");
    alert("Share link copied! (Demo)");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleNewAnalysis}
                data-testid="button-back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                  <Scan className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">DentAge AI</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={handleShare}
                data-testid="button-share"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button 
                size="sm" 
                className="gap-2"
                onClick={handleDownloadReport}
                data-testid="button-download"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download Report</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <h1 className="text-2xl md:text-3xl font-bold">Analysis Complete</h1>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {session.fileName}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Processed in {result.processingTime}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
                <CardTitle>Analyzed X-Ray</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" data-testid="button-zoom">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" data-testid="button-reset-view">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden bg-muted">
                  {session.previewUrl ? (
                    <img 
                      src={session.previewUrl} 
                      alt="Analyzed dental X-ray" 
                      className="w-full h-auto max-h-96 object-contain"
                      data-testid="img-analyzed-xray"
                    />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">X-ray image</p>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                    {result.analyzedTeeth.slice(0, 3).map((tooth) => (
                      <Badge key={tooth.tooth} className="bg-primary/90">
                        {tooth.tooth.split(" ")[0]} {tooth.tooth.split(" ")[1]} Detected
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tooth-by-Tooth Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.analyzedTeeth.map((tooth) => (
                    <div 
                      key={tooth.tooth} 
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">{tooth.stage}</span>
                        </div>
                        <div>
                          <p className="font-medium">{tooth.tooth}</p>
                          <p className="text-sm text-muted-foreground">
                            Demirjian Stage {tooth.stage}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{tooth.score}%</p>
                        <p className="text-xs text-muted-foreground">confidence</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Developmental Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(result.features).map(([key, value]) => (
                    <div 
                      key={key} 
                      className="flex justify-between items-center p-4 bg-muted/50 rounded-lg"
                    >
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
              <CardContent className="p-6 text-center relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <p className="text-sm opacity-80 mb-1">Estimated Dental Age</p>
                <p className="text-6xl font-bold mb-1" data-testid="text-estimated-age">
                  {result.estimatedAge}
                </p>
                <p className="text-lg opacity-90 mb-4">years old</p>
                <div className="pt-4 border-t border-primary-foreground/20">
                  <p className="text-sm opacity-80">Age Range</p>
                  <p className="text-lg font-semibold">
                    {result.ageRange.min} - {result.ageRange.max} years
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between gap-4">
                  <span>Overall Confidence</span>
                  <span className="text-primary text-2xl font-bold" data-testid="text-confidence">
                    {result.confidence}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={result.confidence} className="h-4" />
                <p className="text-sm text-muted-foreground mt-3">
                  High confidence based on {result.analyzedTeeth.length} teeth analyzed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demirjian Scale Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {["A", "B", "C", "D", "E", "F", "G", "H"].map((stage) => {
                    const isDetected = result.analyzedTeeth.some((t) => t.stage === stage);
                    return (
                      <div 
                        key={stage} 
                        className={`text-center p-2 rounded-md ${
                          isDetected 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}
                      >
                        <span className="font-bold">{stage}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Stages detected in this analysis are highlighted
                </p>
              </CardContent>
            </Card>

            <Button 
              className="w-full gap-2" 
              size="lg"
              onClick={handleDownloadReport}
              data-testid="button-download-full"
            >
              <Download className="w-5 h-5" />
              Download Full PDF Report
            </Button>

            <Button 
              variant="outline" 
              className="w-full gap-2" 
              size="lg"
              onClick={handleNewAnalysis}
              data-testid="button-new-analysis"
            >
              Analyze Another X-Ray
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
