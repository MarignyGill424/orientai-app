// shared/schema.ts
import { z } from "zod";

export const orientationFormSchema = z.object({
  // Champs de base
  name: z.string().min(1, "Le nom est requis"),
  age: z.number().min(10).max(99), // plage élargie pour couvrir les deux cas
  email: z.string().email("Email invalide"),
  interests: z.array(z.string()).optional(),

  // Champs supplémentaires
  genre: z.string(),
  mobilite: z.string().optional(),
  disponibilite: z.string().optional(),
  argent: z.string().optional(),
  citation: z.string().optional(),

  passion1: z.string().optional(),
  passion2: z.string().optional(),
  passion3: z.string().optional(),
  passion4: z.string().optional(),
  passion5: z.string().optional(),
  interet: z.array(z.string()).optional(),
  objet: z.string().optional(),
  videos: z.string().optional(),
  appMagique: z.string().optional(),

  competence: z.array(z.string()).optional(),
  talent: z.array(z.string()).optional(),

  motivation: z.array(z.string()).optional(),
  aspirations: z.string().optional(),
  inspirations: z.string().optional(),
  apprentissage: z.string().optional(),

  apprentissageStyle: z.array(z.string()).optional(),

  environnement: z.array(z.string()).optional(),
  teletravail: z.string().optional(),

  valeur_aventure: z.number().min(1).max(5).optional(),
  valeur_creativite: z.number().min(1).max(5).optional(),
  valeur_securite: z.number().min(1).max(5).optional(),
  valeur_aider: z.number().min(1).max(5).optional(),
  valeur_autonomie: z.number().min(1).max(5).optional(),
  valeur_curiosite: z.number().min(1).max(5).optional(),
  valeur_collaboration: z.number().min(1).max(5).optional(),
  valeur_reconnaissance: z.number().min(1).max(5).optional(),
  valeur_equilibre: z.number().min(1).max(5).optional(),
  valeur_defis: z.number().min(1).max(5).optional(),
  valeur_justice: z.number().min(1).max(5).optional(),
  valeur_nature: z.number().min(1).max(5).optional(),
  valeurs_generales: z.array(z.string()).optional(),

  connaissance: z.array(z.string()).optional(),
  experience: z.string().optional(),
  experience_details: z.string().optional(),
});

export type OrientationFormData = z.infer<typeof orientationFormSchema>;
