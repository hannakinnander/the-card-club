import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import CartItem from "../common/CartItem";
import Total, { calculateTotal } from "../common/Total";
import FormWrapper from "./FormWrapper";
import ShippingMethodForm from "./ShippingMethodForm";
import CustomerInformationForm from "./CustomerInformationForm";
import type { ShippingForm, ShippingType } from "../../types/shipping";
import type { CustomerInfo } from "../../types/customerInfo";
import { useState } from "react";
import type { INewOrder } from "../../types/order";
import type { PaymentForm, PaymentType } from "../../types/payment";
import PaymentMethodForm from "./PaymentMethod";

const CheckoutPage = () => {
  const { orderItems } = useCart();
  const [shippingMethod, setShippingMethod] = useState<ShippingType>();

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>();
  const [editingCustomerInfo, setEditingCustomerInfo] = useState(false);
  const [editingShipping, setEditingShipping] = useState(false);
  const [editingPayment, setEditingPayment] = useState(false);

  //KOMPLETTERA MED TYP FÖR CUSTOMERINFO
  const createOrder = () => {
    const total = calculateTotal(orderItems);

    const newOrder: INewOrder = {
      orderItems,
      customerInfo,

      total,
      date: "1231313131",
      ordernumber: 1533,
    };
  };

  const onSubmit = (
    type: "customerInfo" | "shippingMethod" | "paymentMethod",
    data: CustomerInfo | ShippingForm | PaymentForm,
  ) => {
    if (type === "customerInfo" && "firstName" in data) {
      setCustomerInfo(data);
      setEditingCustomerInfo(false);
    } else if (type === "shippingMethod" && "shippingMethod" in data) {
      setShippingMethod(data.shippingMethod);
      setEditingShipping(false);
    } else if (type === "paymentMethod" && "paymentMethod" in data) {
      setPaymentMethod(data.paymentMethod);
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
        <CustomerInformationForm
          customerInfo={customerInfo}
          onSubmit={onSubmit}
        />
      </FormWrapper>

      <FormWrapper
        isLocked={!customerInfo}
        isCompleted={!!shippingMethod}
        isEditing={editingShipping}
        onClick={() => setEditingShipping(true)}
        heading={"Leverans"}
        summary={shippingMethod && <p>{shippingMethod}</p>}
      >
        <ShippingMethodForm
          shippingMethod={shippingMethod}
          onSubmit={onSubmit}
        />
      </FormWrapper>

      <FormWrapper
        isLocked={!customerInfo && !shippingMethod}
        isCompleted={!!paymentMethod}
        isEditing={editingPayment}
        onClick={() => setEditingPayment(true)}
        heading={"Betalning"}
        summary={paymentMethod && <p>{paymentMethod}</p>}
      >
        <PaymentMethodForm paymentMethod={paymentMethod} onSubmit={onSubmit} />
      </FormWrapper>
      <button
        onClick={() => {
          const now = new Date().toISOString();
          console.log(now);
        }}
      >
        Klick
      </button>
    </div>
  );
};

export default CheckoutPage;
