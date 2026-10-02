import type { CustomerInfo } from "./customerInfo";
import type { PaymentType } from "./payment";
import type { ShippingType } from "./shipping";

export interface ICheckoutData {
  customerInfo?: CustomerInfo;
  shippingMethod?: ShippingType;
  paymentMethod?: PaymentType;
}
