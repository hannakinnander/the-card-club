import type { IOrder } from "../types/order";

const API_URL = "http://localhost:3000/orders";

export const getAllOrders = async (): Promise<IOrder[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Kunde inte hitta orders");
  }
  return response.json();
};

export const getOrder = async (id: string): Promise<IOrder> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Kunde inte hitta order");
  }
  return response.json();
};

export const postOrder = async (order: IOrder) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error("Kunde inte skapa order");
  }

  return response.json();
};
