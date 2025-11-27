import { UploadProvider } from "@/context/UploadContext";
import UploadCard from "../UploadCard";

export default function UploadCardExample() {
  return (
    <UploadProvider>
      <div className="max-w-2xl mx-auto p-6">
        <UploadCard />
      </div>
    </UploadProvider>
  );
}
