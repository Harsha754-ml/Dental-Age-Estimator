# Design Guidelines: AI-Powered Dental Age Estimation Website

## Design Approach

**Selected Approach:** Hybrid - Design System with Healthcare SaaS References

Drawing inspiration from professional healthcare/diagnostic platforms (PathAI, Arterys) combined with Material Design principles for a clean, trustworthy medical interface. The design must convey scientific credibility while remaining approachable and modern.

**Core Principles:**
- Medical professionalism with modern polish
- Clear information hierarchy for clinical users
- Trust-building through clean, precise layouts
- Functional elegance over decorative elements

---

## Typography System

**Font Stack:** Google Fonts - Inter (primary), JetBrains Mono (technical data)

**Hierarchy:**
- Hero Headline: text-5xl md:text-6xl, font-bold, leading-tight
- Section Headers: text-3xl md:text-4xl, font-bold
- Subsections: text-xl md:text-2xl, font-semibold
- Body Text: text-base md:text-lg, leading-relaxed
- Technical Data/Results: text-sm md:text-base, font-mono
- Labels/Captions: text-sm, font-medium

---

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Component internal padding: p-4 to p-8
- Section vertical spacing: py-12 md:py-20 lg:py-24
- Card spacing: gap-6 to gap-8
- Button/form element spacing: space-y-4

**Container Strategy:**
- Full-width sections with inner max-w-7xl mx-auto px-6
- Content-heavy sections: max-w-6xl
- Upload interface: max-w-4xl for focus
- Results display: max-w-6xl for detailed data

---

## Page Structure & Sections

### 1. Header Navigation
Sticky header with logo, navigation links (How It Works, Features, About, Contact), and prominent "Upload X-Ray" CTA button

### 2. Hero Section (100vh)
**Layout:** Full-viewport split layout
- Left (50%): Compelling headline "AI-Powered Dental Age Estimation for Forensic Science", subtitle explaining OPG X-ray analysis, primary CTA "Analyze X-Ray Image", secondary link "View Demo Analysis"
- Right (50%): Large hero image showing dental X-ray with subtle AI overlay visualization

**Image:** Professional composite showing panoramic dental X-ray with elegant AI analysis overlay indicators (think clean medical imaging software aesthetic)

### 3. Upload Interface Section
**Layout:** Centered max-w-4xl
- Large drag-and-drop zone (min-h-96) with dashed border
- Supported format badges (JPG, PNG, TIF, DICOM) displayed as pills
- Upload progress indicator with percentage
- "Or select from your device" button as alternative

### 4. How It Works Section
**Layout:** 3-column grid (grid-cols-1 md:grid-cols-3 gap-8)
Each step card includes:
- Numbered badge (1, 2, 3)
- Icon (upload, analysis, results)
- Title and description
- Subtle connecting arrows between cards on desktop

### 5. Technology Showcase
**Layout:** 2-column asymmetric (40/60 split)
- Left: Image showing CNN model architecture diagram or tooth detection visualization
- Right: Technical details about deep learning model, Demirjian A-H scale explanation, accuracy metrics

**Image:** Clean infographic-style visualization of the AI analysis process

### 6. Results Preview Section
**Layout:** Centered with max-w-5xl
- Mockup of analysis results interface showing:
  - Predicted dental age with confidence score (large, prominent display)
  - Tooth development stages table
  - Annotated X-ray visualization
  - "Download PDF Report" button
- Use card-based layout with subtle shadows

### 7. Applications Section
**Layout:** 2-column grid (grid-cols-1 md:grid-cols-2 gap-12)
- Forensic Science applications card
- Clinical/Pediatric applications card
Each with icon, headline, bullet points of use cases

### 8. Trust & Credibility Section
**Layout:** Single column max-w-4xl centered
- Statistical highlights in 3-column grid (accuracy rate, images analyzed, research citations)
- Brief methodology explanation
- Links to published research or validation studies

### 9. Footer
Multi-column layout with:
- Company/project information
- Quick links (Documentation, Research, Privacy Policy)
- Contact information
- Academic/institutional affiliations

---

## Component Library

### Upload Zone
Large bordered container with:
- Dashed border treatment
- Centered icon and text
- Hover state with subtle border emphasis
- Active drop state visual feedback

### Result Cards
Clean cards with:
- Subtle shadow (shadow-md)
- Rounded corners (rounded-lg)
- Internal padding (p-6)
- Clear data hierarchy

### CTA Buttons
- Primary: Large (px-8 py-4), rounded-lg, font-semibold
- Secondary: Outline style with same sizing
- Buttons on hero image: backdrop-blur-sm with semi-transparent background

### Data Display Tables
- Clean rows with alternating subtle background treatment
- Monospace font for numerical data
- Clear column headers with font-medium

### Icons
Use Heroicons via CDN for all interface icons (upload, checkmark, analysis indicators)

---

## Images Required

1. **Hero Image:** High-quality panoramic dental X-ray with clean AI overlay visualization (right 50% of hero section)
2. **Technology Image:** CNN model architecture or tooth detection process diagram (technology showcase section)
3. **Results Mockup:** Screenshot/mockup of analysis results interface (results preview section)

All images should have professional medical imaging aesthetic - clean, precise, trustworthy.

---

## Animations

Minimal, purposeful animations only:
- Upload zone: Subtle pulse on drag-over
- Progress indicators: Smooth width transitions
- Section reveals: Simple fade-in on scroll (use Intersection Observer)
- Results display: Staged reveal of data points

Avoid excessive motion that undermines professional credibility.