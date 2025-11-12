import express from "express";
import { generateOrientationSuggestions } from "../services/gemini";

const router = express.Router();

router.post("/orientation", async (req, res) => {
  try {
    console.log("📥 Données reçues dans /orientation :", req.body);

    const result = await generateOrientationSuggestions(req.body);

    // ✅ Réponse enrichie avec success
    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    const message = (error as Error).message || "";

    console.error("❌ Erreur dans /orientation :", message);

    // ✅ Gestion spécifique du modèle surchargé
    if (message.includes("temporairement indisponible") || message.includes("503")) {
      return res.status(503).json({
        success: false,
        error: "Le modèle est temporairement indisponible. Réessaie dans quelques instants."
      });
    }

    // ❌ Erreur générique
    res.status(500).json({
      success: false,
      error: "Erreur lors de la génération des suggestions.",
      details: message
    });
  }
});

export default router;
