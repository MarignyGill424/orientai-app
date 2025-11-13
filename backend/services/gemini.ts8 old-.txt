import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log("🔑 Clé Gemini chargée :", GEMINI_API_KEY?.slice(0, 5));

if (!GEMINI_API_KEY) {
  console.warn("⚠️ Clé API Gemini manquante. Réponse simulée activée.");
  throw new Error("Clé GEMINI_API_KEY absente en production");
}

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

// ----------------------------------------------------
// Fonction générique d’appel REST
async function callGemini(prompt: string, asJson: boolean = false): Promise<any> {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GEMINI_API_KEY}`,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
  }


const data: any = await response.json();
const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";



  if (asJson) {
    try {
      return JSON.parse(text);
    } catch {
      return { introduction: "Réponse JSON invalide", raw: text };
    }
  }
  return text.trim();
}

// ----------------------------------------------------
// Normalisation des réponses
function normalizeGeminiResponse(parsed: any) {
  const rawMetiers = parsed.recommandations_carrieres || [];
  const metiers = rawMetiers.map((m: any) => ({
    titre: m.titre || "Métier sans titre",
    description: m.description || "",
    pourquoi_innovant_non_traditionnel: m.pourquoi_innovant_non_traditionnel || "",
    competences_cles: m.competences_cles || [],
    etapes_concretes: m.etapes_concretes || [],
  }));
  return {
    introduction: parsed.introduction || null,
    analyse_profil: parsed.analyse_profil || null,
    recommandations_carrieres: metiers,
    conseils_generaux: parsed.conseils_generaux || { recommandations: [] }
  };
}

// ----------------------------------------------------
// Génération de l’introduction
async function generateIntroduction(formulaire: any) {
  console.log("🚀 Appel de generateIntroduction");

  const prenom = formulaire.prenom;
  const genre = formulaire.genre;
  const phraseIntro =
    genre === "femme"
      ? `Voici le profil d’orientation de ${prenom}, elle est une adolescente pleine de potentiel.`
      : genre === "homme"
        ? `Voici le profil d’orientation de ${prenom}, il est un adolescent curieux et motivé.`
        : `Voici le profil d’orientation de ${prenom}, iel est une personne pleine de ressources.`;

  const prompt = `{
    "introduction": "${phraseIntro}"
  }`;

  try {
    const result = await callGemini(prompt, true);
    console.log("🧾 Étape intro :", result);
    return result;
  } catch (error) {
    console.error("❌ Erreur dans generateIntroduction :", error);
    return { introduction: phraseIntro };
  }
}

// ----------------------------------------------------
// Génération du profil principal
async function generateProfilPrincipal(formulaire: any) {
  const prenom = formulaire.prenom;
  const genre = formulaire.genre;

  const phraseIntro =
    genre === "femme"
      ? `Voici le profil d’orientation de ${prenom}, elle est une adolescente pleine de potentiel.`
      : genre === "homme"
        ? `Voici le profil d’orientation de ${prenom}, il est un adolescent curieux et motivé.`
        : `Voici le profil d’orientation de ${prenom}, iel est une personne pleine de ressources.`;

  const phraseInspirante = `${prenom}, tu es capable de grandes choses. Garde confiance et avance avec courage.`;

  const prompt = `
{
  "introduction": "${phraseIntro}",
  "analyse_profil": {
    "paragraphe_intro": "...",
    "points_forts": "...",
    "freins": "...",
    "aspirations": "...",
    "conclusion": "..."
  },
  "message_inspirant": "${phraseInspirante}"
}
`;

  try {
    const result = await callGemini(prompt, true);
    console.log("🧾 Profil principal :", result);
    return result;
  } catch {
    return {
      introduction: phraseIntro,
      analyse_profil: {
        paragraphe_intro: "",
        points_forts: "",
        freins: "",
        aspirations: "",
        conclusion: ""
      },
      message_inspirant: phraseInspirante
    };
  }
}

// ----------------------------------------------------
// Génération des interprétations
async function generateInterpretations(formulaire: any) {
  const prenom = formulaire.prenom;
  const genre = formulaire.genre;

  let interpretation_ileDeserte = "Interprétation non disponible";
  let interpretation_videos = "Interprétation non disponible";

  try {
    const promptIle = `${prenom} a choisi comme objet pour une île déserte : "${formulaire.ileDeserte || "Aucune sélection"}". Explique ce que ce choix révèle sur lui/elle.`;
    interpretation_ileDeserte = await callGemini(promptIle);
  } catch (error) {
    console.error("❌ Erreur Gemini île déserte :", error);
  }

  try {
    const promptVideos = `${prenom} a indiqué que ses vidéos préférées sont : "${formulaire.videos || "Aucune sélection"}". Explique ce que cela révèle sur lui/elle.`;
    interpretation_videos = await callGemini(promptVideos);
  } catch (error) {
    console.error("❌ Erreur Gemini vidéos :", error);
  }

  return {
    ileDeserte: formulaire.ileDeserte || "Aucune sélection",
    interpretation_ileDeserte,
    videos: formulaire.videos || "Aucune sélection",
    interpretation_videos
  };
}

// ----------------------------------------------------
// Fonction principale
export async function generateOrientationSuggestions(formulaire: any) {
  console.log("🚀 Appel de generateOrientationSuggestions");
  console.log("📥 Données reçues :", formulaire);

  try {
    const intro = await generateIntroduction(formulaire);
    const profil = await generateProfilPrincipal(formulaire);
    const interpretations = await generateInterpretations(formulaire);

    const final = {
      ...normalizeGeminiResponse(profil),
      ...interpretations,
      introduction: intro.introduction || null
    };

    console.log("📦 Réponse fusionnée :", JSON.stringify(final, null, 2));
    return final;
  } catch (error: any) {
    console.error("❌ Erreur Gemini :", error);
    throw new Error(`Erreur Gemini : ${error?.message}`);
  }
}
