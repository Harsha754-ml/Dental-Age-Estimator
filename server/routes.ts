import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";

const upload = multer({ storage: multer.memoryStorage() });

const randomInRange = (min: number, max: number, decimals = 1) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/analyze", upload.single("image"), (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No image file uploaded." });
    }

    const processingTime = (Math.random() * 2 + 1).toFixed(1);
    const estimatedAge = randomInRange(12, 18);

    const teethData = [
      { tooth: "Lower Left 7 (37)", stage: "F", score: randomInRange(90, 98, 0) },
      { tooth: "Lower Left 6 (36)", stage: "G", score: randomInRange(90, 98, 0) },
      { tooth: "Lower Left 5 (35)", stage: "G", score: randomInRange(88, 95, 0) },
      { tooth: "Lower Right 5 (45)", stage: "F", score: randomInRange(89, 96, 0) },
      { tooth: "Lower Right 6 (46)", stage: "G", score: randomInRange(91, 99, 0) },
      { tooth: "Lower Right 7 (47)", stage: "F", score: randomInRange(90, 97, 0) },
    ];

    const analyzedTeeth = teethData.map(tooth => ({
      ...tooth,
      // Randomly decide if a tooth was used for the estimation
      usedForEstimation: Math.random() > 0.4, 
    }));

    const result = {
      estimatedAge,
      ageRange: {
        min: +(estimatedAge - randomInRange(0.5, 1.5)).toFixed(1),
        max: +(estimatedAge + randomInRange(0.5, 1.5)).toFixed(1),
      },
      confidence: randomInRange(85, 99),
      analyzedTeeth, // Use the new array with the flag
      features: {
        rootLength: "Equal to crown height",
        crownFormation: "Complete",
        apexClosure: "Partially open",
        eruptionStatus: "Fully erupted",
      },
      fileName: file.originalname,
      fileSize: file.size,
      processingTime: `${processingTime}s`,
    };

    setTimeout(() => {
      res.status(200).json(result);
    }, parseInt(processingTime, 10) * 1000);
  });

  return httpServer;
}
