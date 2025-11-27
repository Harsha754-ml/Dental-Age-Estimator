import { useState, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { useUpload } from "@/context/UploadContext";

export default function UploadCard() {
  const [, setLocation] = useLocation();
  const { session, uploadFile, startAnalysis, clearSession } = useUpload();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const pendingFileRef = useRef<File | null>(null);

  const supportedFormats = ["JPG", "PNG", "TIF", "DICOM"];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = useCallback((file: File) => {
    pendingFileRef.current = file;
    setIsUploading(true);
    setUploadProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        setIsUploading(false);
        if (pendingFileRef.current) {
          uploadFile(pendingFileRef.current);
          pendingFileRef.current = null;
        }
      } else {
        setUploadProgress(progress);
      }
    }, 100);
  }, [uploadFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      simulateUpload(file);
    }
  }, [simulateUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const handleGetResults = async () => {
    await startAnalysis();
    setLocation("/results");
  };

  const clearFile = () => {
    setUploadProgress(0);
    setIsUploading(false);
    clearSession();
  };

  const hasFile = session.file !== null;
  const uploadComplete = uploadProgress === 100 && !isUploading;

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 ${
        isDragging 
          ? "border-primary border-2 bg-primary/5 scale-[1.02]" 
          : hasFile 
            ? "border-primary/50" 
            : "hover:border-primary/30"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="p-8 md:p-12">
        {!hasFile && !isUploading ? (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDragging ? "bg-primary text-primary-foreground scale-110" : "bg-primary/10"
            }`}>
              <Upload className={`w-10 h-10 ${isDragging ? "" : "text-primary"}`} />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {isDragging ? "Drop your file here" : "Upload Your X-Ray Image"}
              </h3>
              <p className="text-muted-foreground">
                Drag and drop or click to browse
              </p>
            </div>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.tif,.tiff,.dcm"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              data-testid="input-file-upload"
              aria-label="Upload X-ray image file"
            />
            
            <Button size="lg" className="pointer-events-none gap-2">
              <Upload className="w-4 h-4" />
              Select File
            </Button>

            <div className="flex flex-wrap justify-center gap-2">
              {supportedFormats.map((format) => (
                <Badge key={format} variant="secondary">
                  {format}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {isUploading ? (
              <>
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
                <div className="w-full max-w-sm">
                  <Progress value={uploadProgress} className="h-3" />
                  <p className="text-center text-muted-foreground mt-3">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-1">
                    Upload Complete
                  </h3>
                  <p className="font-medium">{session.fileName}</p>
                  <p className="text-sm text-muted-foreground">
                    {(session.fileSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                {session.previewUrl && (
                  <div className="w-full max-w-md rounded-lg overflow-hidden border border-border">
                    <img 
                      src={session.previewUrl} 
                      alt="Uploaded X-ray preview" 
                      className="w-full h-48 object-cover"
                      data-testid="img-upload-preview"
                    />
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Button 
                    size="lg" 
                    onClick={handleGetResults}
                    disabled={session.isAnalyzing}
                    className="gap-2 min-w-[180px]"
                    data-testid="button-get-results"
                  >
                    {session.isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Get Results
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={clearFile}
                    disabled={session.isAnalyzing}
                    data-testid="button-upload-new"
                  >
                    Upload New
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
