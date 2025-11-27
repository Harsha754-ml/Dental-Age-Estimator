# DentAge AI - Dental Age Estimation System

## Overview

DentAge AI is an AI-powered web application for dental age estimation using panoramic OPG X-ray images. The system uses deep learning (CNN architecture) to analyze dental development stages according to the Demirjian A-H scale, providing accurate age predictions for forensic science, clinical dentistry, medico-legal investigations, and research applications.

The application features a modern healthcare-focused interface built with React and shadcn/ui components, offering users the ability to upload X-ray images, receive AI-powered analysis results, and download detailed PDF reports.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized production builds
- **Routing:** Wouter for lightweight client-side routing
- **State Management:** React Context API (UploadContext) for upload session state
- **Data Fetching:** TanStack Query (React Query) for server state management
- **UI Components:** shadcn/ui component library built on Radix UI primitives
- **Styling:** Tailwind CSS with custom design tokens and CSS variables

**Design System:**
- Custom color palette with light/dark mode support via CSS variables
- Typography system using Inter (primary) and JetBrains Mono (technical data)
- Consistent spacing primitives (4, 6, 8, 12, 16, 20, 24)
- Component variants using class-variance-authority (CVA)
- Healthcare/medical-focused design principles prioritizing trust and professionalism

**Key Architecture Decisions:**
- **Component-based architecture:** Modular, reusable UI components following shadcn/ui patterns
- **Context-driven state:** Upload workflow managed through UploadContext providing centralized session state
- **Type safety:** Full TypeScript coverage with strict mode enabled
- **Path aliases:** Organized imports using `@/`, `@shared/`, and `@assets/` aliases
- **Responsive design:** Mobile-first approach with breakpoint-aware components

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with Express.js server
- **Language:** TypeScript with ES modules
- **Development:** tsx for development server with hot reload
- **Production:** esbuild for optimized server bundling
- **Database ORM:** Drizzle ORM with PostgreSQL dialect

**Server Structure:**
- **Entry point:** `server/index.ts` - Express application setup with middleware
- **Routes:** `server/routes.ts` - API endpoint registration (currently placeholder)
- **Storage:** `server/storage.ts` - Data access layer abstraction with in-memory implementation
- **Static serving:** `server/static.ts` - Production static file serving
- **Development:** `server/vite.ts` - Vite middleware integration for dev mode

**Key Architecture Decisions:**
- **Middleware-first approach:** Express middleware stack for logging, body parsing, and request handling
- **Storage abstraction:** IStorage interface allows switching between in-memory and database implementations
- **Selective bundling:** Whitelist approach for bundling specific dependencies to reduce cold start times
- **Dual-mode server:** Development uses Vite middleware; production serves pre-built static files
- **Type-safe API:** Shared schema definitions between client and server via `shared/schema.ts`

**Current Implementation Status:**
- User schema defined with username/password fields
- In-memory storage implementation (MemStorage) for development
- API routes are placeholders awaiting implementation
- Upload/analysis endpoints need to be created

### Data Storage

**Database Configuration:**
- **Dialect:** PostgreSQL via Neon serverless driver
- **ORM:** Drizzle ORM with type-safe query builder
- **Schema location:** `shared/schema.ts`
- **Migrations:** `drizzle-kit` for schema migrations in `./migrations` directory
- **Validation:** Drizzle-Zod integration for runtime schema validation

**Schema Design:**
- **Users table:** Basic authentication with id, username, password
- **Session storage:** Connect-pg-simple for PostgreSQL session storage (configured but not yet implemented)

**Key Architecture Decisions:**
- **Shared schema:** Database schema shared between client/server for type consistency
- **Neon serverless:** Enables serverless PostgreSQL connections without persistent pools
- **Schema-first approach:** Drizzle schema definitions drive TypeScript types
- **Future expansion:** Schema ready for additional tables (analyses, results, reports)

### Application Workflow

**User Journey:**
1. **Landing page:** Marketing content explaining features, technology, and use cases
2. **Upload section:** Drag-and-drop or file picker for X-ray upload (JPG, PNG, TIF, DICOM)
3. **Processing:** Simulated upload progress and analysis state management
4. **Results page:** Detailed analysis results with estimated age, confidence scores, and tooth-level data
5. **Report generation:** Downloadable PDF report (placeholder implementation)

**State Management:**
- **Upload session:** Managed by UploadContext with file metadata, preview URL, analysis status
- **Mock data:** Currently using mock analysis results pending AI model integration
- **Navigation:** Context-aware routing redirects users without completed analysis back to home

## External Dependencies

### UI Component Libraries
- **@radix-ui/react-*:** Unstyled, accessible component primitives (accordion, dialog, dropdown, popover, etc.)
- **shadcn/ui:** Pre-styled components built on Radix UI with Tailwind CSS
- **lucide-react:** Icon library for consistent UI iconography
- **cmdk:** Command palette component
- **embla-carousel-react:** Carousel/slider functionality

### Form & Validation
- **react-hook-form:** Form state management and validation
- **@hookform/resolvers:** Form validation resolvers
- **zod:** Runtime type validation and schema definition
- **zod-validation-error:** User-friendly Zod error messages
- **drizzle-zod:** Drizzle schema to Zod schema conversion

### Data & State Management
- **@tanstack/react-query:** Server state management, caching, and data fetching
- **wouter:** Lightweight React router

### Styling & Utilities
- **tailwindcss:** Utility-first CSS framework
- **class-variance-authority:** Component variant management
- **clsx / tailwind-merge:** Class name merging utilities
- **date-fns:** Date formatting and manipulation

### Database & Backend
- **@neondatabase/serverless:** Neon serverless PostgreSQL driver
- **drizzle-orm:** TypeScript ORM for SQL databases
- **drizzle-kit:** Database migration and schema management tool
- **express:** Web server framework
- **connect-pg-simple:** PostgreSQL session store for Express (configured)

### Development & Build Tools
- **vite:** Frontend build tool and dev server
- **@vitejs/plugin-react:** React plugin for Vite
- **esbuild:** JavaScript bundler for server code
- **tsx:** TypeScript execution for Node.js
- **typescript:** TypeScript compiler and type checker
- **@replit/vite-plugin-*:** Replit-specific development plugins

### Future Integration Points
- **AI Model API:** Dental age estimation CNN model endpoint (not yet implemented)
- **PDF Generation:** Report generation library needed for downloadable results
- **Image Processing:** X-ray image preprocessing and validation
- **File Upload:** Multipart form handling for X-ray uploads (multer configured)
- **Authentication:** Session-based auth infrastructure in place, awaiting implementation