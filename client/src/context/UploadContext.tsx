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
    setSession((prev) => ({ ...prev, isAnalyzing: true }));

    // todo: remove mock functionality - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockResult: AnalysisResult = {
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
      processingTime: "1.8s",
    };

    setSession((prev) => ({
      ...prev,
      isAnalyzing: false,
      analysisComplete: true,
      result: mockResult,
    }));
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
