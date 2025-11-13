import React, { useState } from "react";
import QuestionnaireForm from "./components/QuestionnaireForm";

function App() {
  const [response, setResponse] = useState<string>("");

  // Fonction de test pour appeler ton backend REST
  async function testGemini() {
    console.log("Bouton cliqué"); // debug
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Dis-moi un métier adapté à un ado curieux" }),
      });

      if (!res.ok) {
        throw new Error(`Erreur HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log("Réponse backend:", data);
      setResponse(data.output || "Pas de réponse");
    } catch (err) {
      console.error("Erreur fetch:", err);
      setResponse("Erreur lors de l'appel au backend");
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🌟 ORIENTAI</h1>
      <QuestionnaireForm />
      <p>Test affichage ORIENTAI 🚀</p>

      {/* ✅ Bouton de test */}
      <button onClick={testGemini} style={{ marginTop: "1rem" }}>
        Tester /api/gemini
      </button>

      {/* ✅ Affichage de la réponse */}
      {response && (
        <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
          <strong>Réponse :</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
