import { createContext, useContext, useState, type ReactNode } from "react";

// todo: remove mock functionality - replace with actual API response
interface AnalysisResult {
  estimatedAge: number;
  ageRange: { min: number; max: number };
  confidence: number;
  analyzedTeeth: Array<{
    tooth: string;
    stage: string;
    score: number;
    usedForEstimation: boolean;
  }>;
  features: {
    rootLength: string;
    crownFormation: string;
    apexClosure: string;
    eruptionStatus: string;
  };
  processingTime: string;
}

interface UploadSession {
  file: File | null;
  fileName: string;
  fileSize: number;
  previewUrl: string | null;
  isAnalyzing: boolean;
  analysisComplete: boolean;
  result: AnalysisResult | null;
}

interface UploadContextType {
  session: UploadSession;
  uploadFile: (file: File) => void;
  startAnalysis: () => Promise<void>;
  clearSession: () => void;
}

const initialSession: UploadSession = {
  file: null,
  fileName: "",
  fileSize: 0,
  previewUrl: null,
  isAnalyzing: false,
  analysisComplete: false,
  result: null,
};

const UploadContext = createContext<UploadContextType | null>(null);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<UploadSession>(initialSession);

  const uploadFile = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setSession({
      file,
      fileName: file.name,
      fileSize: file.size,
      previewUrl,
      isAnalyzing: false,
      analysisComplete: false,
      result: null,
    });
  };

  const startAnalysis = async (): Promise<void> => {
    if (!session.file) {
      console.error("No file to analyze.");
      return;
    }

    setSession((prev) => ({ ...prev, isAnalyzing: true }));

    try {
      const formData = new FormData();
      formData.append("image", session.file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const result: AnalysisResult = await response.json();

      setSession((prev) => ({
        ...prev,
        isAnalyzing: false,
        analysisComplete: true,
        result,
      }));
    } catch (error) {
      console.error("Analysis failed:", error);
      // Optionally, update the UI to show an error state
      setSession((prev) => ({ ...prev, isAnalyzing: false, analysisComplete: false, result: null }));
    }
  };

  const clearSession = () => {
    if (session.previewUrl) {
      URL.revokeObjectURL(session.previewUrl);
    }
    setSession(initialSession);
  };

  return (
    <UploadContext.Provider
      value={{ session, uploadFile, startAnalysis, clearSession }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within UploadProvider");
  }
  return context;
}
