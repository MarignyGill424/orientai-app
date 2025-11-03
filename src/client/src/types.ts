export type OrientationResults = {
  analyse_profil?: Record<string, string> | string;
  recommandations_carrieres?: {
    titre: string;
    description: string;
    pourquoi_innovant_non_traditionnel?: string;
  }[];
  conseils_generaux?: Record<string, string>;
  message_inspirant?: string;
  ileDeserte?: string;
  interpretation_ileDeserte?: string;
  videos?: string;
  interpretation_videos?: string;
};
