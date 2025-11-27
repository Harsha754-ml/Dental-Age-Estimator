import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Stethoscope, Users, FileSearch } from "lucide-react";

const applications = [
  {
    icon: Scale,
    title: "Forensic Science",
    description: "Essential for determining age in criminal investigations and identification of unknown individuals.",
    useCases: [
      "Age estimation for unidentified remains",
      "Criminal case age verification",
      "Disaster victim identification",
      "Immigration age disputes",
    ],
  },
  {
    icon: Stethoscope,
    title: "Clinical Dentistry",
    description: "Supporting pediatric dentistry and orthodontic treatment planning with accurate developmental assessment.",
    useCases: [
      "Orthodontic treatment timing",
      "Growth assessment monitoring",
      "Pediatric dental planning",
      "Developmental delay detection",
    ],
  },
  {
    icon: Users,
    title: "Medico-Legal",
    description: "Providing evidence-based age estimation for legal proceedings and documentation.",
    useCases: [
      "Asylum seeker age assessment",
      "Child welfare cases",
      "Legal age verification",
      "Court-admissible reports",
    ],
  },
  {
    icon: FileSearch,
    title: "Research",
    description: "Advancing dental age estimation research with standardized, reproducible analysis.",
    useCases: [
      "Population studies",
      "Method validation",
      "Training data generation",
      "Comparative analysis",
    ],
  },
];

export default function ApplicationsSection() {
  return (
    <section id="applications" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Applications & Use Cases
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our dental age estimation system serves professionals across forensic science, 
            clinical practice, legal investigations, and academic research.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <Card key={app.title} className="hover-elevate">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <app.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">{app.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{app.description}</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {app.useCases.map((useCase) => (
                    <li 
                      key={useCase} 
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
