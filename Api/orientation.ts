// api/orientation.ts
import { generateOrientationSuggestions } from "../server/gemini";

export default async function handler(req, res) {
  console.log("🚀 Requête reçue dans /api/orientation");

  try {
    const formulaire = req.body;
    console.log("📥 Données reçues :", formulaire);

    const result = await generateOrientationSuggestions(formulaire);
    console.log("📤 Résultat généré :", result);

    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Erreur côté serveur :", error);
    res.status(500).json({ error: "Erreur lors de la génération des suggestions." });
  }
}
