export type Recipes = {
  id: string;
  authorFirstName: string;
  authorLastName: string;
  date: number | null;
  manual: string;
  page: number;
  name: string;
  images?: string[];
  ingredients: { ingredient: string; amount: string; unit: string }[];
  description: string;
  source: string;
  url?: string | undefined;
};
