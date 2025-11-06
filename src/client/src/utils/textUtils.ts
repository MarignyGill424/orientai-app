// src/utils/textUtils.ts
export function renderTexteAvecPrenomEtGenre({
  texte,
  prenom,
  genre,
}: {
  texte: string;
  prenom: string;
  genre: string;
}): string {
  if (!prenom) prenom = "l'utilisateur";

  const pronoms = {
    il: "il",
    elle: "elle",
    le: "le",
    la: "la",
    lui: "lui",
    son: "son",
    sa: "sa",
    ses: "ses",
  };

  if (genre === "femme") {
    pronoms.il = "elle";
    pronoms.le = "la";
    pronoms.lui = "elle";
    pronoms.son = "sa";
  } else if (genre === "non-binaire" || genre === "autre") {
    pronoms.il = "iel";
    pronoms.le = "le·la";
    pronoms.lui = "lui·elle";
    pronoms.son = "son·sa";
  }

  return texte
    .replaceAll("{prenom}", prenom)
    .replaceAll("{il}", pronoms.il)
    .replaceAll("{le}", pronoms.le)
    .replaceAll("{lui}", pronoms.lui)
    .replaceAll("{son}", pronoms.son)
    .replaceAll("{sa}", pronoms.sa)
    .replaceAll("{ses}", pronoms.ses);
}
