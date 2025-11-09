import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import orientationRoute from "./routes/orientation.route.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Routes de test placées avant les routeurs
app.get("/ping", (_, res) => res.send("pong"));
app.get("/", (_req, res) => {
  res.send("Bienvenue sur le serveur OrientAI 🚀");
});

// Route existante pour l'orientation
app.use("/api", orientationRoute);

// Nouvelle route pour interroger Gemini
app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt manquant" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    const result = await model.generateContent(prompt);

    res.json({ output: result.response.text() });
  } catch (err) {
    console.error("Erreur Gemini:", err);
    res.status(500).json({ error: "Erreur lors de l'appel à Gemini" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur OrientAI lancé sur http://localhost:${PORT}`);
});
