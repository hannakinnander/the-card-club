import type { CustomerInfo } from "./customerInfo";
import type { OrderItem } from "./orderItem";
import type { PaymentType } from "./payment";
import type { ShippingType } from "./shipping";

//Måste typa om rätt efter hur datan ser ut från formulären
export interface INewOrder {
  customerInfo: CustomerInfo;
  orderItems: OrderItem[];
  total: number;
  shippingMethod: ShippingType;
  paymentMethod: PaymentType;
  date: string;
  ordernumber: number;
}
export interface IOrder extends INewOrder {
  id: string;
}
