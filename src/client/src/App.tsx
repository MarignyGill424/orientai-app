import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionnaireWrapper from "./components/QuestionnaireWrapper";
import Resultats from "./components/Resultats"; // adapte le chemin si besoin

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionnaireWrapper />} />
        <Route path="/resultats" element={<Resultats />} />
      </Routes>
    </Router>
  );
}

export default App;
