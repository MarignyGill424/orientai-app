import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

async function main() {
  const result = await ai.listModels();
  console.log("📋 Modèles disponibles :", result);
}

main().catch(err => console.error("❌ Erreur listModels :", err));
