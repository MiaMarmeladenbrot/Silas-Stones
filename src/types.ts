export type Recipes = {
  id: string;
  authorFirstName: string;
  authorLastName: string;
  date: number;
  manual: string;
  page: number;
  name: string;
  ingredients: { ingredient: string; amount: string; unit: string }[];
  description: string;
  source: string;
};

export type Props = {
  recipes: Recipes[];
};
