import { Card, CardContent } from "@/components/ui/card";

// todo: remove mock functionality
const stats = [
  { value: "97.3%", label: "Accuracy Rate", description: "On validated test datasets" },
  { value: "27,000+", label: "Training Images", description: "Annotated panoramic X-rays" },
  { value: "<5s", label: "Analysis Time", description: "Average processing speed" },
  { value: "A-H", label: "Demirjian Scale", description: "Full classification support" },
];

export default function StatsSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted & Validated
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our system is built on rigorous research and validated against 
            large-scale annotated datasets for reliable clinical and forensic use.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center hover-elevate">
              <CardContent className="p-6">
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="font-semibold mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12">
          <CardContent className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Research-Backed Methodology</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our deep learning model is trained on extensively annotated panoramic datasets, 
                utilizing established dental development staging criteria. The system provides 
                a fast, accurate, and automated alternative to traditional manual age-estimation 
                methods, significantly improving reliability and efficiency in dental age determination 
                for both clinical and forensic applications.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
