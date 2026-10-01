import type { OrderItem } from "./orderItem";

//Måste typa om rätt efter hur datan ser ut från formulären
export interface INewOrder {
  customerInfo: {
    firstName: string;
    lastName: string;
    street: string;
    zipcode: number;
    city: string;
  };
  orderItems: OrderItem[];
  total: number;
  date: string;
  ordernumber: number;
}
export interface IOrder extends INewOrder {
  id: string;
}
