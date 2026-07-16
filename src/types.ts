export type Recipes = {
  id: string;
  authorFirstName: string;
  authorLastName: string;
  date: number | null;
  manual: string;
  page: string;
  name: string;
  images?: string[];
  ingredients: { ingredient: string; amount: string; unit: string }[];
  description: string;
  source: string;
  type: string;
  url?: string | undefined;
  // --- shown only in the detail view, not in the table ---
  country?: string;
  site?: string;
  dateDisplay?: string;
  originalTitle?: string;
  originalText?: string;
  notes?: string;
  furtherBibliography?: string;
  commentOnText?: string;
};
