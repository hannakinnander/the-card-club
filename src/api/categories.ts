import type { ICategory } from "../types/categories";

const API_URL = "http://localhost:3000/categories";

export const getCategories = async (): Promise<ICategory[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Kunde inte hämta kategorier");
  }
  return response.json();
};
