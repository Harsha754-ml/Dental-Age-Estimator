import { Scan } from "lucide-react";

const footerLinks = {
  product: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Technology", href: "#technology" },
    { label: "Applications", href: "#applications" },
    { label: "Pricing", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Research Papers", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Support", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "HIPAA Compliance", href: "#" },
    { label: "Data Security", href: "#" },
  ],
};

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4" data-testid="link-footer-logo">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Scan className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">DentAge AI</span>
            </a>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Advanced AI-powered dental age estimation for forensic science, 
              clinical practice, and research applications.
            </p>
            <p className="text-sm text-muted-foreground">
              Contact: research@dentage.ai
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            2024 DentAge AI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built for forensic science and clinical excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
