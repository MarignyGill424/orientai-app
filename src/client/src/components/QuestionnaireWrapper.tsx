import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import QuestionnaireForm from "./questionnaire-form";

export default function QuestionnaireWrapper() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Initialisation du formulaire
  const form = useForm();

  const handleShowResults = (results, profileId) => {
    console.log("🎯 Résultats reçus :", results);
    console.log("🆔 ID du profil :", profileId);

    if (results && typeof results === "object") {
      navigate("/resultats", { state: results });
    } else {
      console.warn("⚠️ Données de profil manquantes ou invalides");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🧭 Orientation Professionnelle</h1>

      <QuestionnaireForm
        form={form} // ✅ Passage du form au composant
        onShowResults={handleShowResults}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
