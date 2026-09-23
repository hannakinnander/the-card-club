interface ICategory {
  id: string;
  title: string;
}
const API_URL = "http://localhost:5173/categories";

export const getCategories = async (): Promise<ICategory> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Kunde inte hämta kategorier");
  }
  return response.json();
};
