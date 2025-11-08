import express from "express";
import cors from "cors";
import { generateOrientationSuggestions } from "./services/gemini";


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Serveur opérationnel !");
});

// Exemple d’endpoint pour tester ta fonction
app.post("/api/orientation", async (req, res) => {
  try {
    const result = await generateOrientationSuggestions(req.body);
    res.json(result);
  } catch (error) {
    console.error("❌ Erreur dans /api/orientation :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
