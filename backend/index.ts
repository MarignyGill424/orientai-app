import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import orientationRoute from "./routes/orientation.route"; // ✅ corrigé
import fetch from "node-fetch"; // ✅ on utilise fetch au lieu du SDK

dotenv.config();

console.log("🚀 Initialisation du serveur OrientAI..."); // ✅ log de démarrage

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes de test
app.get("/ping", (_, res) => res.send("pong"));
app.get("/", (_req, res) => {
  res.send("Bienvenue sur le serveur OrientAI 🚀");
});

// Route Gemini (REST direct)
app.post("/api/gemini", async (req, res) => {
  try {
    console.log("📥 Requête reçue sur /api/gemini :", req.body);

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt manquant" });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;


const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const response = await fetch(GEMINI_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
  }),
});



    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Erreur API Gemini:", errorText);
      return res
        .status(response.status)
        .json({ success: false, error: errorText });
    }

    const data: any = await response.json();
    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "Réponse vide";

    // ✅ Ici on renvoie bien la variable output
    res.json({ success: true, output });
  } catch (err: any) {
    console.error("❌ Erreur Gemini:", err);
    res
      .status(500)
      .json({ success: false, error: "Erreur lors de l'appel à Gemini" });
  }
});

// Route orientation
app.use("/api", orientationRoute);

app.listen(PORT, () => {
  console.log(`✅ Serveur OrientAI lancé sur http://localhost:${PORT}`);
});
