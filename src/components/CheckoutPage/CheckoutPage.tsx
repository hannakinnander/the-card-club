import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import CartItem from "../common/CartItem";
import Total from "../common/Total";
import FormWrapper from "./FormWrapper";
import ShippingMethodForm from "./ShippingMethodForm";
import CustomerInformationForm from "./CustomerInformationForm";
import type { ShippingForm, ShippingType } from "../../types/shipping";
import type { CustomerInfo } from "../../types/customerInfo";
import { useState } from "react";
import type { PaymentForm } from "../../types/payment";
import PaymentMethodForm from "./PaymentMethod";


const CheckoutPage = () => {
  const { orderItems } = useCart();
  const [shipping, setShipping] = useState<ShippingType>();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>();
  const [payment, setPayment] = useState<string>();
  const [editingCustomerInfo, setEditingCustomerInfo] = useState(false);
  const [editingShipping, setEditingShipping] = useState(false);
  const [editingPayment, setEditingPayment] = useState(false);

  const onSubmit = (
    type: "customerInfo" | "shipping" | "payment",
    data: CustomerInfo | ShippingForm | PaymentForm
    
  ) => {
    if (type === "customerInfo" && "firstName" in data) {
      setCustomerInfo(data);
      setEditingCustomerInfo(false);
    } else if (type === "shipping" && "shipping" in data) {
      setShipping(data.shipping);
      setEditingShipping(false);
    } else if (type === "payment" && "paymentMethod" in data) {
      setPayment(data.paymentMethod);
      setEditingPayment(false);
    }
  };
  return (
    <div>
      <Link to="/cart">Tillbaka till varukorg</Link>
      <h2 className={"text-3xl"}>Kassa</h2>
      <div>
        <h3 className={""}>Orderöversikt</h3>
        {orderItems.map((orderItem) => (
          <div key={orderItem.product.id}>
            <CartItem
              orderItem={orderItem}
            >{`Antal: ${orderItem.quantity}`}</CartItem>
          </div>
        ))}
        <Total />
      </div>
      <FormWrapper
        isLocked={false}
        isCompleted={!!customerInfo}
        isEditing={editingCustomerInfo}
        onClick={() => setEditingCustomerInfo(true)}
        heading={"Kundinformation"}
        summary={
          customerInfo && (
            <div>
              <p>
                {customerInfo.firstName} {customerInfo.lastName}
              </p>
              <p>{customerInfo.address}</p>
              <p>
                {customerInfo.zipCode} {customerInfo.city}
              </p>
            </div>
          )
        }
      >
        <CustomerInformationForm customerInfo={customerInfo} onSubmit={onSubmit} />
      </FormWrapper>

      <FormWrapper
        isLocked={!customerInfo}
        isCompleted={!!shipping}
        isEditing={editingShipping}
        onClick={() => setEditingShipping(true)}
        heading={"Leverans"}
        summary={shipping && <p>{shipping}</p>}
      >
        <ShippingMethodForm shipping={shipping} onSubmit={onSubmit} />
      </FormWrapper>

      
      <FormWrapper
        isLocked={false}
        isCompleted={!!payment}
        isEditing={editingPayment}
        onClick={() => setEditingPayment(true)}
        heading={"Betalning"}
        summary={payment && <p>{payment}</p>}
      >
        <PaymentMethodForm onSubmit={onSubmit} />
      </FormWrapper> 
    </div>
  );
};

export default CheckoutPage;
