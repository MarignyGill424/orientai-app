import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionnaireForm from "./questionnaire-form";

export default function QuestionnaireWrapper() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleShowResults = (results, profileId) => {
    console.log("🎯 Résultats reçus :", results);
    console.log("🆔 ID du profil :", profileId);

    if (results && typeof results === "object") {
      navigate("/resultats", { state: results });
    } else {
      console.warn("⚠️ Données de profil manquantes ou invalides");
    }
  };

  // 🧪 Mock temporaire pour tester l'affichage des résultats
  const handleMockResults = () => {
    const mockResults = {
      analyse_profil: {
        logique: "forte",
        créativité: "moyenne",
        empathie: "élevée"
      },
      recommandations_carrieres: [
        {
          titre: "UX Designer",
          description: "Crée des interfaces intuitives et centrées sur l’utilisateur.",
          pourquoi_innovant_non_traditionnel: "Allie psychologie, design et technologie."
        },
        {
          titre: "Data Analyst",
          description: "Analyse les données pour en tirer des insights.",
          pourquoi_innovant_non_traditionnel: "Transforme les données en décisions stratégiques."
        }
      ],
      conseils_generaux: {
        formation: "Explore les bootcamps en design ou data science.",
        bien_etre: "Prends du temps pour toi chaque semaine.",
        social: "Rejoins des communautés professionnelles pour échanger."
      },
      message_inspirant: "Tu es une pépite en devenir 💎"
    };

    navigate("/resultats", { state: mockResults });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🧭 Orientation Professionnelle</h1>

      <QuestionnaireForm
        onShowResults={handleShowResults}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <div style={{ marginTop: "2rem" }}>
        <button onClick={handleMockResults}>🧪 Tester les résultats mock</button>
      </div>
    </div>
  );
}
