import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileImage, X, CheckCircle2 } from "lucide-react";

interface UploadSectionProps {
  onFileUpload?: (file: File) => void;
}

export default function UploadSection({ onFileUpload }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const supportedFormats = ["JPG", "PNG", "TIF", "DICOM"];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      simulateUpload(file);
      onFileUpload?.(file);
    }
  }, [onFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      simulateUpload(file);
      onFileUpload?.(file);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  return (
    <section id="upload" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upload Your X-Ray Image
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simply drag and drop your panoramic dental X-ray image or select a file 
            from your device. We support multiple image formats.
          </p>
        </div>

        <Card 
          className={`relative p-8 md:p-12 border-2 border-dashed transition-all ${
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!uploadedFile ? (
            <div className="flex flex-col items-center gap-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                isDragging ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <Upload className="w-8 h-8" />
              </div>
              
              <div className="text-center">
                <p className="text-lg font-medium mb-2">
                  {isDragging ? "Drop your file here" : "Drag and drop your X-ray image"}
                </p>
                <p className="text-muted-foreground">
                  or click to browse from your device
                </p>
              </div>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.tif,.tiff,.dcm"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                data-testid="input-file-upload"
              />
              
              <Button variant="outline" className="pointer-events-none">
                Select File
              </Button>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {supportedFormats.map((format) => (
                  <Badge key={format} variant="secondary" className="text-xs">
                    {format}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                {uploadProgress === 100 ? (
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                ) : (
                  <FileImage className="w-8 h-8 text-primary" />
                )}
              </div>
              
              <div className="text-center">
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              {isUploading && (
                <div className="w-full max-w-xs">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              {uploadProgress === 100 && !isUploading && (
                <div className="flex items-center gap-3">
                  <Button data-testid="button-analyze">
                    Analyze Image
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={clearFile}
                    data-testid="button-clear-file"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Your images are processed securely and never stored permanently.
        </p>
      </div>
    </section>
  );
}
