import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; // ⚡ REST call

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

// ✅ Interface pour typer la réponse Gemini
interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
}

// ✅ Endpoint de test
app.get("/", (req, res) => {
  res.send("🚀 Serveur opérationnel avec Gemini REST !");
});

// ✅ Endpoint principal pour l’orientation
app.post("/api/orientation", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt manquant" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = (await response.json()) as GeminiResponse;

    res.json({
      suggestions: data.candidates?.[0]?.content?.parts?.[0]?.text || "Pas de réponse",
    });
  } catch (error) {
    console.error("❌ Erreur REST /api/orientation :", error);
    res.status(500).json({ error: "Erreur lors de l'appel REST à Gemini" });
  }
});

// ✅ Endpoint /api/gemini (compatibilité avec ton frontend actuel)
app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt manquant" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = (await response.json()) as GeminiResponse;

    res.json({
      output: data.candidates?.[0]?.content?.parts?.[0]?.text || "Pas de réponse",
    });
  } catch (error) {
    console.error("❌ Erreur REST /api/gemini :", error);
    res.status(500).json({ error: "Erreur lors de l'appel REST à Gemini" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
