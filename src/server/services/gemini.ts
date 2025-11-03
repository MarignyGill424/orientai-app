import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log("🔑 Clé Gemini chargée :", GEMINI_API_KEY?.slice(0, 5));

if (!GEMINI_API_KEY) {
  console.warn("⚠️ Clé API Gemini manquante. Réponse simulée activée.");
}

const ai = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

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


async function generateIntroduction(formulaire: any) {
  console.log("🚀 Appel de generateIntroduction");

  try {
    if (!ai) throw new Error("Gemini API non initialisée");
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prenom = formulaire.prenom;
    const genre = formulaire.genre;

    const phraseIntro =
      genre === "femme"
        ? `Voici le profil d’orientation de ${prenom}, elle est une adolescente pleine de potentiel.`
        : genre === "homme"
          ? `Voici le profil d’orientation de ${prenom}, il est un adolescent curieux et motivé.`
          : `Voici le profil d’orientation de ${prenom}, iel est une personne pleine de ressources.`;

    const prompt = `
Tu dois répondre uniquement avec un objet JSON contenant une clé "introduction".

Cette clé doit contenir exactement cette phrase :
"${phraseIntro}"

Ne modifie pas cette phrase. Ne la reformule pas. Ne fais aucun commentaire. Juste le JSON.

Réponds uniquement avec ce format :
{
  "introduction": "${phraseIntro}"
}
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    });

    const response = await result.response.text();
    console.log("🧾 Étape intro (texte brut) :", response);
    return JSON.parse(response);
  } catch (error) {
    console.error("❌ Erreur dans generateIntroduction :", error);
    return { introduction: null };
  }
}




async function generateProfilPrincipal(formulaire: any) {
  if (!ai) throw new Error("Gemini API non initialisée");
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

// Prompt pour Gemini

const prenom = formulaire.prenom;
const genre = formulaire.genre;

const pronoms = genre === "femme"
  ? { il: "elle", le: "la", lui: "elle", son: "sa", sa: "sa", ses: "ses" }
  : genre === "homme"
    ? { il: "il", le: "le", lui: "lui", son: "son", sa: "sa", ses: "ses" }
    : { il: "iel", le: "le·la", lui: "lui·elle", son: "son·sa", sa: "son·sa", ses: "ses" };


const phraseIntro =
  genre === "femme"
    ? `Voici le profil d’orientation de ${prenom}, elle est une adolescente pleine de potentiel.`
    : genre === "homme"
      ? `Voici le profil d’orientation de ${prenom}, il est un adolescent curieux et motivé.`
      : `Voici le profil d’orientation de ${prenom}, iel est une personne pleine de ressources.`;

const phraseInspirante = `${prenom}, tu es capable de grandes choses. Garde confiance et avance avec courage.`;





const prompt = `
Tu es un assistant d'orientation bienveillant et inspirant. Ton rôle est de rédiger une analyse personnalisée du profil d’un·e adolescent·e, en t’appuyant sur ses réponses au questionnaire.

⚠️ Ta première phrase doit obligatoirement être :
"${phraseIntro}"

Accorde tous les pronoms au bon genre (${pronoms.il}, ${pronoms.le}, ${pronoms.lui}, ${pronoms.son}, ${pronoms.sa}, ${pronoms.ses}).

Sois chaleureux·se, motivant·e, et valorise les réponses de l’ado.

Termine par une phrase encourageante comme :
"${phraseInspirante}"

Voici les données du profil :

- Prénom : ${prenom}
- Genre : ${genre}
- Âge : ${formulaire.age}
- Localisation : ${formulaire.mobilite}
- Disponibilité : ${formulaire.disponibilite}
- Passions : ${[formulaire.passion1, formulaire.passion2, formulaire.passion3, formulaire.passion4, formulaire.passion5].filter(Boolean).join(", ")}
- Centres d’intérêt : ${formulaire.interet?.join(", ")}
- Ce dont ${prenom} est fier·e : ${formulaire.fierte}
- Ce qui le·la freine : ${formulaire.freins}
- Citation personnelle : ${formulaire.citation}
- Objet choisi pour une île déserte : ${formulaire.ileDeserte}
- Vidéos préférées : ${formulaire.videos}
- Application magique imaginée : ${formulaire.appMagique}
- Style d’apprentissage : ${formulaire.apprentissage}
- Talents : ${formulaire.talents?.join(", ")}
- Compétences : ${formulaire.competences?.join(", ")}
- Environnement préféré : ${formulaire.environnement?.join(", ")}
- Valeurs : ${formulaire.valeurs_generales?.join(", ")}



Tu dois répondre uniquement avec un objet JSON. Ne fais aucun commentaire. Ne commence pas par une phrase. Ne donne pas d’explication. Juste le JSON.

Tu dois renvoyer un objet JSON strictement conforme au format suivant.

⚠️ La clé "introduction" est obligatoire. Elle doit contenir exactement cette phrase :
"${phraseIntro}"

Ne modifie pas cette phrase. Ne la reformule pas. Elle doit apparaître telle quelle dans la clé "introduction".

Voici le format attendu :

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

`; // ✅ ← ce backtick ferme le template string, et le point-virgule est bien placé



  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" }
  });

  const response = await result.response.text();
  console.log("🧾 Étape 1 - Profil principal :", response);
  return JSON.parse(response);
}

async function generateInterpretations(formulaire: any) {
  if (!ai) throw new Error("Gemini API non initialisée");
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  console.log("📥 Données reçues pour interprétation :", {
    ileDeserte: formulaire.ileDeserte,
    videos: formulaire.videos
  });

  let interpretation_ileDeserte = "Interprétation non disponible";
  let interpretation_videos = "Interprétation non disponible";

  try {
const promptIle = `${prenom} a choisi comme objet pour une île déserte : "${formulaire.ileDeserte || "Aucune sélection"}".
Explique ce que ce choix révèle sur ${pronoms.lui} : sa personnalité, ses valeurs ou ses besoins.
Réponds en une phrase claire, chaleureuse et valorisante.`;


    const resultIle = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: promptIle }] }],
    });

    interpretation_ileDeserte = (await resultIle.response.text()).trim();
    console.log("🧠 Réponse brute île déserte :", interpretation_ileDeserte);
  } catch (error) {
    console.error("❌ Erreur Gemini île déserte :", error);
  }

  try {
const promptVideos = `${prenom} a indiqué que ${pronoms.ses} vidéos préférées sont : "${formulaire.videos || "Aucune sélection"}".
Explique ce que cela révèle sur ${pronoms.lui} : sa sensibilité, ses centres d’intérêt ou sa manière d’apprendre.
Réponds en une phrase claire, bienveillante et motivante.`;


    const resultVideos = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: promptVideos }] }],
    });

    interpretation_videos = (await resultVideos.response.text()).trim();
    console.log("🎬 Réponse brute vidéos :", interpretation_videos);
  } catch (error) {
    console.error("❌ Erreur Gemini vidéos :", error);
  }

  return {
    ileDeserte: formulaire.ileDeserte || "Aucune sélection",
    interpretation_ileDeserte: interpretation_ileDeserte || "Interprétation non disponible",
    videos: formulaire.videos || "Aucune sélection",
    interpretation_videos: interpretation_videos || "Interprétation non disponible"
  };
}

export async function generateOrientationSuggestions(formulaire: any) {
  console.log("🚀 Appel de generateOrientationSuggestions");

  if (!ai) {
    console.log("🧪 Mode simulé activé");
    return {
      introduction: null,
      analyse_profil: {
        resume: "Profil simulé",
        points_forts: ["Créatif", "Curieux"]
      },
      recommandations_carrieres: [],
      conseils_generaux: { recommandations: [] },
      ileDeserte: "Aucune sélection",
      interpretation_ileDeserte: "Interprétation non disponible",
      videos: "Aucune sélection",
      interpretation_videos: "Interprétation non disponible"
    };
  }

  try {
    const [intro, profil, interpretations] = await Promise.all([
      generateIntroduction(formulaire),
      generateProfilPrincipal(formulaire),
      generateInterpretations(formulaire)
    ]);

    const final = {
      ...normalizeGeminiResponse(profil),
      ...interpretations,
      introduction: intro.introduction || null
    };

    console.log("📦 Réponse fusionnée :", JSON.stringify(final, null, 2));
    console.log("✅ Final avec intro :", final);

    return final;
  } catch (error) {
    const message = (error as Error).message || "";

    if (message.includes("model is overloaded") || message.includes("503")) {
      console.error("❌ Le modèle Gemini est surchargé. Réessaie plus tard.");
      throw new Error("Le modèle est temporairement indisponible. Réessaie dans quelques instants.");
    }

    console.error("❌ Erreur Gemini :", error);
    throw new Error(`Erreur Gemini : ${message}`);
  }
}



