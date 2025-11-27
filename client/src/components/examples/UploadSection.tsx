import UploadSection from "../UploadSection";

export default function UploadSectionExample() {
  return <UploadSection onFileUpload={(file) => console.log("File uploaded:", file.name)} />;
}
