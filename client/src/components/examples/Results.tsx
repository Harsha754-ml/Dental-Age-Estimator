import { UploadProvider } from "@/context/UploadContext";
import Results from "@/pages/Results";

export default function ResultsExample() {
  return (
    <UploadProvider>
      <Results />
    </UploadProvider>
  );
}
