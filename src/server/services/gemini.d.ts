export interface CareerSuggestion {
  title: string;
  description: string;
  category: string;
  matchReason: string;
  nextSteps: string[];
}

export interface OrientationResult {
  summary: string;
  personalityProfile: string;
  topCareers: CareerSuggestion[];
  developmentAreas: string[];
  nextSteps: string[];
  inspirationalMessage: string;
}

export function generateOrientationSuggestions(
  formData: Record<string, any>
): Promise<OrientationResult>;

