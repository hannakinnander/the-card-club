import type { IProduct } from "../types/product";

const API_URL = "http://localhost:5173/products";

export const getAllProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Kunde inte hämta produkter");
  }
  return response.json();
};

export const getProduct = async (id: string): Promise<IProduct> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Kunde inte hämta produkt");
  }
  return response.json();
};
