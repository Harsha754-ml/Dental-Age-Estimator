# DentAge AI - Dental Age Estimator

DentAge AI is a modern, full-stack web application designed to simulate the process of estimating dental age from panoramic X-ray images. It features a sleek, animated user interface and showcases a complete client-server architecture with dynamic analysis feedback and PDF report generation.

## ✨ Features

- **Dynamic AI Simulation:** The backend provides a dynamic, simulated analysis for each uploaded image, giving unique results every time.
- **Interactive UI:** A beautiful and responsive interface built with React and Tailwind CSS.
- **"Next-Level" Animations:** Smooth, professional animations powered by Framer Motion for page transitions, component loading, and data visualization.
- **Bounding Box Visualization:** Detected teeth are marked with color-coded bounding boxes and informational tooltips directly on the X-ray image.
- **Elegant PDF Reports:** Generate and download a professional, styled PDF of the analysis results.
- **Full-Stack Architecture:** Demonstrates a complete project structure with a React/Vite frontend and a Node.js/Express backend, both written in TypeScript.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express, TypeScript
- **Animations:** Framer Motion
- **PDF Generation:** jsPDF, html2canvas
- **File Uploads:** Multer

##  Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## 🚀 Getting Started

Follow these steps to get the application running on your local machine.

### 1. Clone the Repository

First, clone the repository to your local machine (if you haven't already).

```bash
git clone https://github.com/Harsha754-ml/Dental-Age-Estimator.git
cd Dental-Age-Estimator
```

### 2. Install Dependencies

Install all the necessary npm packages for both the client and the server.

```bash
npm install
```

### 3. Run the Development Server

This command starts the backend Express server and the Vite development server for the frontend simultaneously. The application will be accessible at `http://localhost:5173`.

```bash
npm run dev
```
The server will automatically watch for file changes and reload as you make edits.

## how to use

1.  **Open the Application:** Navigate to `http://localhost:5173` in your web browser.
2.  **Upload an Image:** Drag and drop a panoramic dental X-ray image onto the upload card, or click to select a file from your device.
3.  **Get Results:** After the upload is complete, click the "Get Results" button.
4.  **View Analysis:** You will be taken to the results page, where you can see the animated analysis, including the bounding boxes on the X-ray.
5.  **Download Report:** Click the "Download Report" button to generate and save a styled PDF of the complete analysis.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Runs the production-ready build.
- `npm run check`: Runs the TypeScript compiler to check for type errors.
