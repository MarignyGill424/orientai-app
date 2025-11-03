import React from "react";

export const InterpretationValeursPhares = ({
  keyValeur,
  score,
}: {
  keyValeur: string;
  score: number;
}) => {


const messages: Record<string, Record<number, string>> = {
  valeur_aventure: {
    5: "🌍 Tu as soif d’exploration et d’inconnu. L’aventure te nourrit.",
    1: "🏡 Tu préfères la stabilité à l’imprévu, et c’est une force précieuse.",
  },
  valeur_creativite: {
    5: "🎨 Tu débordes d’idées et aimes inventer. La créativité est ton moteur.",
    1: "📐 Tu privilégies les méthodes éprouvées, ce qui t’apporte clarté et rigueur.",
  },
  valeur_securite: {
    5: "🛡️ Tu recherches un cadre rassurant et prévisible. La sécurité te permet de t’épanouir.",
    1: "🎢 Tu es à l’aise avec le changement et l’incertitude, prêt·e à naviguer l’inconnu.",
  },
  valeur_aider: {
    5: "🤝 Tu es attentif·ve aux autres et prêt·e à les soutenir. L’altruisme te guide.",
    1: "🧭 Tu préfères te concentrer sur ton propre chemin, ce qui t’aide à rester aligné·e.",
  },
  valeur_autonomie: {
    5: "🦋 Tu aimes décider par toi-même et avancer librement. L’autonomie te stimule.",
    1: "👫 Tu apprécies les repères et les conseils, et tu sais bien t’entourer.",
  },
  valeur_curiosite: {
    5: "🧠 Tu as une vraie soif d’apprendre et de comprendre le monde.",
    1: "🧘 Tu préfères te concentrer sur ce que tu connais bien, sans te disperser.",
  },
  valeur_collaboration: {
    5: "👥 Tu aimes travailler en équipe et construire avec les autres.",
    1: "🧑‍💻 Tu préfères avancer seul·e, en gardant ton indépendance.",
  },
  valeur_reconnaissance: {
    5: "🏆 Tu as besoin que ton travail soit vu et reconnu. C’est un moteur pour toi.",
    1: "🌱 Tu avances sans chercher à briller, avec humilité et constance.",
  },
  valeur_equilibre: {
    5: "⚖️ Tu tiens à préserver ton énergie et ton bien-être. L’équilibre est essentiel pour toi.",
    1: "🔥 Tu es prêt·e à t’investir à fond, quitte à mettre tes priorités de côté.",
  },
  valeur_defis: {
    5: "🚀 Tu aimes te dépasser et relever des défis. L’effort te stimule.",
    1: "🌾 Tu préfères avancer à ton rythme, sans pression inutile.",
  },
  valeur_justice: {
    5: "⚖️ Tu es sensible aux injustices et tu veux que chacun soit traité équitablement.",
    1: "🧩 Tu acceptes que le monde soit imparfait, et tu t’adaptes avec souplesse.",
  },
  valeur_nature: {
    5: "🌍 Tu ressens un lien fort avec la nature et tu veux la protéger.",
    1: "🏙️ Tu es plus tourné·e vers les environnements urbains ou technologiques.",
  },
};


  // Sécurité : ne rien afficher si score invalide ou message absent
  if (!score || score < 1 || score > 5) return null;

  const message = messages[keyValeur]?.[score];
  if (!message) return null;

  return (
    <div className="mt-2 p-3 bg-pink-50 border-l-4 border-pink-400 text-pink-800 rounded shadow-sm transition-opacity duration-500 ease-in-out">
      <p className="text-sm italic">{message}</p>
    </div>
  );
};

