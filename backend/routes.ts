import express from "express";
import { generateOrientationSuggestions } from "./services/gemini";

const router = express.Router();

router.post("/orientation", async (req, res) => {
  try {
    const formData = req.body;
    const result = await generateOrientationSuggestions(formData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la génération des suggestions." });
  }
});

export default router;
