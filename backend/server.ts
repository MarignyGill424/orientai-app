import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleAI } from "@google/genai"; // ✅ nouveau SDK

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ✅ Initialisation du client Gemini
const client = new GoogleAI({ apiKey: process.env.GEMINI_API_KEY! });

// Endpoint de test
app.get("/", (req, res) => {
  res.send("🚀 Serveur opérationnel avec Gemini 1.5 !");
});

// Exemple d’endpoint pour générer des suggestions d’orientation
app.post("/api/orientation", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt manquant" });
    }

    const model = client.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);

    res.json({ suggestions: result.response.text() });
  } catch (error) {
    console.error("❌ Erreur dans /api/orientation :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
