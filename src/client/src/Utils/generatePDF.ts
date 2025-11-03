import jsPDF from "jspdf";

// ✨ Citations inspirantes
const citations = [
  "🌱 « Ce n’est pas parce que les choses sont difficiles que nous n’osons pas, c’est parce que nous n’osons pas qu’elles sont difficiles. » – Sénèque",
  "🚀 « Crois en toi et tout devient possible. »",
  "🎯 « Tu n’as pas besoin d’être parfait pour commencer. Tu dois juste commencer. »",
  "🌈 « Ton avenir ne dépend pas de ce que tu sais déjà, mais de ce que tu es prêt à découvrir. »",
  "💡 « Chaque talent est une graine. À toi de la planter, de l’arroser, et de la faire grandir. »",
  "🔥 « Tu es capable de plus que ce que tu crois. »",
];

export function generatePDF(profil, prenom = "l'utilisateur") {
  const doc = new jsPDF();

  // 🎉 Page de garde
  doc.setFontSize(26);
  doc.setTextColor(34, 197, 94);
  doc.text(`🎓 Profil d’orientation de ${prenom}`, 20, 60);

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Ce document est une boussole pour ton avenir.", 20, 80);
  doc.text("Il contient tes talents, tes aspirations, et des pistes concrètes pour avancer.", 20, 90);
  doc.text("Lis-le avec fierté, partage-le, et surtout… crois en toi 💪", 20, 100);

  doc.addPage();

  // 🧠 Analyse du profil
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(`🧠 Analyse du profil de ${prenom}`, 20, 30);
  let y = 40;

  if (profil.message_inspirant) {
    doc.setFontSize(12);
    doc.setTextColor(0, 128, 0);
    doc.text("🌟 Message inspirant :", 20, y);
    y += 10;
    doc.setTextColor(0, 0, 0);
    doc.text(doc.splitTextToSize(profil.message_inspirant, 170), 20, y);
    y += 20;
  }

  if (profil.interpretation_ileDeserte) {
    doc.setFontSize(12);
    doc.setTextColor(0, 128, 128);
    doc.text("🏝️ Interprétation de ton objet sur l’île déserte :", 20, y);
    y += 10;
    doc.setTextColor(0, 0, 0);
    doc.text(doc.splitTextToSize(profil.interpretation_ileDeserte, 170), 20, y);
    y += 20;
  }

  if (profil.interpretation_videos) {
    doc.setFontSize(12);
    doc.setTextColor(0, 128, 128);
    doc.text("🎬 Interprétation de tes vidéos préférées :", 20, y);
    y += 10;
    doc.setTextColor(0, 0, 0);
    doc.text(doc.splitTextToSize(profil.interpretation_videos, 170), 20, y);
    y += 20;
  }

  if (profil.analyse_profil) {
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("📝 Analyse du profil :", 20, y);
    y += 10;
    Object.entries(profil.analyse_profil).forEach(([key, value]) => {
      doc.text(`${key.replaceAll("_", " ")} : ${value}`, 25, y);
      y += 10;
    });
  }

  // 💼 Recommandations de carrière
  if (Array.isArray(profil.recommandations_carrieres)) {
    doc.addPage();
    y = 30;
    doc.setFontSize(14);
    doc.text("💼 Recommandations de carrière", 20, y);
    y += 10;

    profil.recommandations_carrieres.forEach((metier) => {
      doc.setFontSize(12);
      doc.text(`🔹 ${metier.titre}`, 25, y);
      y += 10;
      doc.text(doc.splitTextToSize(metier.description, 170), 30, y);
      y += 20;

      if (metier.pourquoi_innovant_non_traditionnel) {
        doc.setFont("italic");
        doc.text(doc.splitTextToSize(`💡 Pourquoi c’est innovant : ${metier.pourquoi_innovant_non_traditionnel}`, 170), 30, y);
        doc.setFont("normal");
        y += 15;
      }

      if (Array.isArray(metier.lien_profil)) {
        metier.lien_profil.forEach((lien) => {
          doc.text(`• ${lien}`, 35, y);
          y += 10;
        });
      }

      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 30;
      }
    });
  }

  // 🌈 Page finale
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(34, 197, 94);
  doc.text("🌈 Et maintenant ?", 20, 60);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(doc.splitTextToSize(
    `Ce profil est une base. Tu peux le relire, le discuter, le compléter. L’important, c’est que tu avances à ton rythme, en confiance. Tu as des talents, des envies, et une capacité à apprendre qui ne demandent qu’à s’exprimer. Crois en toi, teste, explore, et surtout… ose rêver grand ✨`,
    170
  ), 20, 80);

  // ✨ Citation finale
  const citation = citations[Math.floor(Math.random() * citations.length)];
  doc.setFontSize(12);
  doc.setTextColor(34, 197, 94);
  doc.text(doc.splitTextToSize(citation, 170), 20, 140);

  // 🖋️ Signature
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Document généré par OrientAI-app`, 20, 270);

  // 💾 Sauvegarde
  doc.save(`profil_orientation_${prenom}.pdf`);
}
