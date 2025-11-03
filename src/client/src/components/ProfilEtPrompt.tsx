import React from "react";

// 🔍 Fonctions d’interprétation
function interpreterIle(reponse?: string): string {
  const map: Record<string, string> = {
    "Carnet et crayon": "créativité et introspection",
    "Livre préféré": "curiosité et évasion",
    "Casque audio": "sensibilité musicale",
    "Outil multifonction": "pragmatisme et autonomie",
    "Objet sentimental": "attachement affectif",
    "Console portable": "goût du jeu et de l’imaginaire",
    "Application magique": "envie de transformer le monde",
    "Animal de compagnie": "empathie et fidélité",
    "Nourriture préférée": "plaisir simple et gourmandise",
    "Miroir ou objet symbolique": "quête de sens et d’identité",
    "Autre": "univers intérieur unique",
  };
  return map[reponse || ""] || "non interprété";
}

function interpreterVideos(reponse?: string): string {
  const map: Record<string, string> = {
    "Humour": "créativité comique et spontanéité",
    "Sport": "énergie et esprit d’équipe",
    "Musique": "sens artistique et rythme",
    "Science": "curiosité intellectuelle",
    "Séries": "goût pour les histoires",
    "Films": "imaginaire et narration",
    "Autre": "intérêts originaux",
  };
  return map[reponse || ""] || "non interprété";
}

type ProfilEtPromptProps = {
  data: {
    valeurs?: string[];
    environnement?: string[];
    domaines?: string[];
    interet?: string[];
    talents?: string[];
    competences?: string[];
    aspirations?: string;
    inspirations?: string;
    apprentissage?: string;
    appMagique?: string;
    ileDeserte?: string;
    videos?: string;
  };
};

const ProfilEtPrompt: React.FC<ProfilEtPromptProps> = ({ data }) => {
  console.log("Profil reçu :", data);
  if (!data || typeof data !== "object") return null;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-primary">🧠 Ton profil</h2>

      <p><strong>Valeurs personnelles :</strong> {Array.isArray(data.valeurs) ? data.valeurs.join(", ") : "non précisé"}</p>
      <p><strong>Environnement préféré :</strong> {Array.isArray(data.environnement) ? data.environnement.join(", ") : "non précisé"}</p>
      <p><strong>Domaines de connaissance :</strong> {Array.isArray(data.domaines) ? data.domaines.join(", ") : "non précisé"}</p>
      <p><strong>Compétences techniques :</strong> {Array.isArray(data.competences) ? data.competences.join(", ") : "non précisé"}</p>
      <p><strong>Talents naturels :</strong> {Array.isArray(data.talents) ? data.talents.join(", ") : "non précisé"}</p>
      <p><strong>Aspirations :</strong> {data.aspirations || "non précisé"}</p>
      <p><strong>Inspirations :</strong> {data.inspirations || "non précisé"}</p>
      <p><strong>Apprentissages hors école :</strong> {data.apprentissage || "non précisé"}</p>
      <p><strong>Application magique :</strong> {data.appMagique || "non précisé"}</p>

      {data.ileDeserte && (
        <p>
          <strong>Choix sur l’île déserte :</strong> {data.ileDeserte} — {interpreterIle(data.ileDeserte)}
        </p>
      )}

      {data.videos && (
        <p>
          <strong>Vidéos préférées :</strong> {data.videos} — {interpreterVideos(data.videos)}
        </p>
      )}

      {Array.isArray(data.talents) && data.talents.length > 0 && (
        <div className="mt-6 p-4 bg-accent/10 rounded-lg">
          <p className="text-accent font-medium">
            ✨ Tes talents naturels comme {data.talents.slice(0, 2).join(" et ")} sont de vrais atouts. Ils peuvent t’aider à t’épanouir dans des domaines où ton potentiel pourra vraiment s’exprimer.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilEtPrompt;
