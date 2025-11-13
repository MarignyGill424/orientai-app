import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionnaireWrapper from "./components/QuestionnaireWrapper";
import Resultats from "./components/Resultats";
import { useState } from "react";

function App() {
  const [response, setResponse] = useState("");

  async function testGemini() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gemini`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Dis-moi un métier adapté à un ado curieux" }),
    });
    const data = await res.json();
    setResponse(JSON.stringify(data));
  }

  return (
    <Router>
      <div style={{ padding: "1rem", background: "#f9f9f9" }}>
        <button onClick={testGemini}>Tester /api/gemini</button>
        <p>Réponse du backend : {response}</p>
      </div>
      <Routes>
        <Route path="/" element={<QuestionnaireWrapper />} />
        <Route path="/resultats" element={<Resultats />} />
      </Routes>
    </Router>
  );
}

export default App;
