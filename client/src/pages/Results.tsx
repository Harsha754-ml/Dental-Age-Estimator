import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, useInView, animate } from "framer-motion";
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReportDocument } from "@/components/ReportDocument";

import { 
  ArrowLeft, 
  Download, 
  Share2, 
  ZoomIn, 
  RotateCcw, 
  CheckCircle2,
  FileText,
  Clock,
  Scan,
  Loader2
} from "lucide-react";
import { useUpload } from "@/context/UploadContext";

// Final adjustment of coordinates for better visual centering.
const MOCK_TOOTH_COORDS: Record<string, { x: number; y: number; width: number; height: number; }> = {
  "Lower Left 7 (37)": { x: 29.5, y: 70, width: 6, height: 16 },
  "Lower Left 6 (36)": { x: 35.5, y: 68, width: 6, height: 15 },
  "Lower Left 5 (35)": { x: 41, y: 67, width: 5.5, height: 14 },
  "Lower Right 5 (45)": { x: 53.5, y: 67, width: 5.5, height: 14 },
  "Lower Right 6 (46)": { x: 58.5, y: 68, width: 6, height: 15 },
  "Lower Right 7 (47)": { x: 64.5, y: 70, width: 6, height: 16 },
};

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(latest) {
          if (ref.current) {
            if (value % 1 !== 0) ref.current.textContent = latest.toFixed(1);
            else ref.current.textContent = latest.toFixed(0);
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <p ref={ref}>0</p>;
}

export default function Results() {
  const [, setLocation] = useLocation();
  const { session, clearSession } = useUpload();
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const mainContentRef = useRef(null);
  const isInView = useInView(mainContentRef, { once: true, amount: 0.2 });

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

  const handleDownloadReport = async () => {
    if (!reportRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`DentAge-AI-Report-${session.fileName || 'report'}.pdf`);

    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Sorry, there was an error generating the PDF report.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    console.log("Sharing results...");
    alert("Share link copied! (Demo)");
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } };

  return (
    <>
      <div className="absolute top-0 left-[-9999px] z-[-1]">
        <ReportDocument ref={reportRef} />
      </div>
      <div className="min-h-screen bg-background">
        <motion.header initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: "easeOut" }} className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16 gap-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={handleNewAnalysis} data-testid="button-back">
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
                 <Button variant="outline" size="sm" className="gap-2" onClick={handleShare} data-testid="button-share"><Share2 className="w-4 h-4" /> <span className="hidden sm:inline">Share</span></Button>
                  <Button size="sm" className="gap-2" onClick={handleDownloadReport} data-testid="button-download" disabled={isDownloading}>
                    {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isDownloading ? "Generating..." : "Download Report"}</span>
                  </Button>
              </div>
            </div>
          </div>
        </motion.header>

        <main ref={mainContentRef} className="max-w-7xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <h1 className="text-2xl md:text-3xl font-bold">Analysis Complete</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1"><FileText className="w-4 h-4" />{session.fileName}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />Processed in {result.processingTime}</span>
            </div>
          </motion.div>

          <motion.div className="grid lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
                  <CardTitle>Analyzed X-Ray</CardTitle>
                </CardHeader>
                <CardContent>
                  <TooltipProvider delayDuration={100}>
                    <div className="relative rounded-lg overflow-hidden bg-gray-900">
                      {session.previewUrl ? (
                        <motion.img initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} src={session.previewUrl} alt="Analyzed dental X-ray" className="w-full h-auto max-h-[500px] object-contain opacity-70" data-testid="img-analyzed-xray"/>
                      ) : (
                        <div className="w-full h-64 flex items-center justify-center"><p className="text-muted-foreground">X-ray image</p></div>
                      )}
                      
                      {result.analyzedTeeth.map((tooth, i) => {
                        const coords = MOCK_TOOTH_COORDS[tooth.tooth];
                        if (!coords) return null;
                        
                        const color = tooth.usedForEstimation ? "border-green-500" : "border-blue-500";
                        const textColor = tooth.usedForEstimation ? "text-green-400" : "text-blue-400";
                        
                        return (
                          <Tooltip key={tooth.tooth}>
                            <TooltipTrigger asChild>
                              <motion.div
                                className={`absolute rounded-md shadow-lg cursor-pointer ${color}`}
                                style={{
                                  left: `${coords.x}%`,
                                  top: `${coords.y}%`,
                                  width: `${coords.width}%`,
                                  height: `${coords.height}%`,
                                  borderWidth: '2px',
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                                whileHover={{ scale: 1.05, zIndex: 10, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                              >
                                <span className={`absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold ${textColor}`}>
                                  {tooth.tooth.match(/\((\d+)\)/)?.[1] || ''}
                                </span>
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-bold">{tooth.tooth}</p>
                              <p>Stage: {tooth.stage}</p>
                              <p>Confidence: {tooth.score}%</p>
                              <p className="text-xs italic">{tooth.usedForEstimation ? "Used for estimation" : "Detected only"}</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </TooltipProvider>
                  <div className="flex items-center justify-end gap-4 mt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-md border-2 border-green-500"/> Used for Estimation</div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-md border-2 border-blue-500"/> Detected</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Tooth-by-Tooth Analysis</CardTitle></CardHeader>
                <CardContent>
                  <motion.div className="space-y-4" variants={containerVariants}>
                    {result.analyzedTeeth.map((tooth) => (
                      <motion.div key={tooth.tooth} variants={itemVariants} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-lg font-bold text-primary">{tooth.stage}</span></div>
                          <div>
                            <p className="font-medium">{tooth.tooth}</p>
                            <p className="text-sm text-muted-foreground">Demirjian Stage {tooth.stage}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary flex items-center gap-1">
                            <AnimatedNumber value={tooth.score} />%
                          </div>
                          <p className="text-xs text-muted-foreground">confidence</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Developmental Features</CardTitle></CardHeader>
                <CardContent>
                  <motion.div className="grid sm:grid-cols-2 gap-4" variants={containerVariants}>
                    {Object.entries(result.features).map(([key, value]) => (
                      <motion.div key={key} variants={itemVariants} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="font-medium">{value}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div className="space-y-6" variants={itemVariants}>
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
                <CardContent className="p-6 text-center relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <p className="text-sm opacity-80 mb-1">Estimated Dental Age</p>
                  <div className="text-6xl font-bold mb-1" data-testid="text-estimated-age">
                    <AnimatedNumber value={result.estimatedAge} />
                  </div>
                  <p className="text-lg opacity-90 mb-4">years old</p>
                  <div className="pt-4 border-t border-primary-foreground/20">
                    <p className="text-sm opacity-80">Age Range</p>
                    <p className="text-lg font-semibold">{result.ageRange.min} - {result.ageRange.max} years</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between gap-4">
                    <span>Overall Confidence</span>
                    <div className="text-primary text-2xl font-bold flex items-center gap-1" data-testid="text-confidence">
                      <AnimatedNumber value={result.confidence} />%
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={isInView ? result.confidence : 0} className="h-4 transition-all duration-1000 ease-out" />
                  <p className="text-sm text-muted-foreground mt-3">High confidence based on {result.analyzedTeeth.length} teeth analyzed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Demirjian Scale Reference</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((stage, i) => (
                      <motion.div
                        key={stage}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        className={`text-center p-2 rounded-md ${result.analyzedTeeth.some((t) => t.stage === stage) ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <span className="font-bold">{stage}</span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-center">Stages detected in this analysis are highlighted</p>
                </CardContent>
              </Card>
              <Button className="w-full gap-2" size="lg" onClick={handleDownloadReport} data-testid="button-download-full" disabled={isDownloading}>
                {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-5 h-5" />}
                {isDownloading ? "Generating PDF..." : "Download Full PDF Report"}
              </Button>
              <Button variant="outline" className="w-full gap-2" size="lg" onClick={handleNewAnalysis} data-testid="button-new-analysis">Analyze Another X-Ray</Button>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </>
  );
}