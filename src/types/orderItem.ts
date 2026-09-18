import { type IProduct } from "./product";

export interface OrderItem {
  product: IProduct;
  quantity: number;
  price: number;
}
