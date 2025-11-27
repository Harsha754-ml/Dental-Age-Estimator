import HeroSection from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <HeroSection
      onUploadClick={() => console.log("Upload clicked")}
      onDemoClick={() => console.log("Demo clicked")}
    />
  );
}
