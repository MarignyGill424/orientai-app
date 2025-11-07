// api/orientation.ts
import { generateOrientationSuggestions } from "../server/gemini";

export default async function handler(req, res) {
  console.log("🚀 Requête reçue dans /api/orientation");

  const formulaire = req.body;
  const result = await generateOrientationSuggestions(formulaire);

  res.status(200).json(result);
}
