import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Scan } from "lucide-react";

interface HeaderProps {
  onUploadClick?: () => void;
}

export default function Header({ onUploadClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Technology", href: "#technology" },
    { label: "Applications", href: "#applications" },
    { label: "About", href: "#about" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <a 
            href="#" 
            className="flex items-center gap-2"
            data-testid="link-logo"
          >
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Scan className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">DentAge AI</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              onClick={onUploadClick}
              data-testid="button-upload-xray-header"
            >
              Upload X-Ray
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
