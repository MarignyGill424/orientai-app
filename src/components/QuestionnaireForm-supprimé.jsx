import { useState } from 'react';

export default function QuestionnaireForm() {
  const [formData, setFormData] = useState({
    age: '',
    passions: '',
    competences: '',
    valeurs: ''
  });

  const [result, setResult] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const prompt = buildPrompt(formData);
    console.log("🧠 Prompt généré :", prompt);

    // Simulation IA
    setTimeout(() => {
      setResult({
        metiers: ['Designer UX', 'Coach créatif', 'Narrateur interactif'],
        parcours: ['Licence Design Numérique', 'Formation en psychologie créative'],
        message: "Tu es un bâtisseur d’univers. Ose les concrétiser."
      });
    }, 1000);
  }

  function buildPrompt(data) {
    return `
Voici le profil d’un adolescent :
- Âge : ${data.age}
- Passions : ${data.passions}
- Compétences : ${data.competences}
- Valeurs : ${data.valeurs}

Analyse ce profil et propose :
1. Des métiers adaptés
2. Des parcours possibles
3. Un message inspirant

Réponds uniquement en JSON selon le schéma fourni.
`;
  }

  return (
    <div>
      <h2>🧭 Questionnaire d’Orientation</h2>
      <form onSubmit={handleSubmit}>
        <input name="age" placeholder="Âge" onChange={handleChange} />
        <input name="passions" placeholder="Passions" onChange={handleChange} />
        <input name="competences" placeholder="Compétences" onChange={handleChange} />
        <input name="valeurs" placeholder="Valeurs" onChange={handleChange} />
        <button type="submit">Analyser mon profil</button>
      </form>

      {result && (
        <div>
          <h3>🎯 Métiers suggérés</h3>
          <ul>{result.metiers.map((m, i) => <li key={i}>{m}</li>)}</ul>
          <h3>📚 Parcours possibles</h3>
          <ul>{result.parcours.map((p, i) => <li key={i}>{p}</li>)}</ul>
          <p>💬 {result.message}</p>
        </div>
      )}
    </div>
  );
}
