import { generateOrientationSuggestions } from "F:\Gill\divers\_Outils - etudes\Elowyne\replit\orientai-app\src\server\services\gemini.ts";
import { OrientationFormData } from "../shared/schema"; // adapte le chemin si besoin

const mockData: OrientationFormData = {
  name: "Léna",
  age: 19,
  interests: ["design", "écologie", "technologie"],
  values: ["impact social", "créativité", "autonomie"],
  skills: ["communication", "pensée critique", "résolution de problèmes"],
  personalityTraits: ["curieuse", "empathique", "analytique"],
  aspirations: ["travailler dans un domaine innovant", "avoir un métier utile"],
};

(async () => {
  try {
    const result = await generateOrientationSuggestions(mockData);
    console.log("✅ Résultat Gemini:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Erreur lors du test Gemini:", error);
  }
})();
