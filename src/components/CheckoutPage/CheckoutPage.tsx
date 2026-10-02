import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import CartItem from "../common/CartItem";
import Total, { calculateTotal } from "../common/Total";
import FormWrapper from "./FormWrapper";
import ShippingMethodForm from "./ShippingMethodForm";
import type { ShippingForm, ShippingType } from "../../types/shipping";
import { useState } from "react";
import type { INewOrder } from "../../types/order";

const CheckoutPage = () => {
  const { orderItems } = useCart();
  const [shipping, setShipping] = useState<ShippingType>();
  const [customerInfo, setCustomerInfo] = useState();
  const [payment, setPayment] = useState();
  //const [editingCustomerInfo, setEditingCustomerInfo] = useState(false);
  const [editingShipping, setEditingShipping] = useState(false);
  // const [editingPayment, setEditingPayment] = useState(false);

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
    type: "customerInfo" | "shipping" | "payment",
    data: ShippingForm,
  ) => {
    if (type === "customerInfo") {
      console.log(data);
    } else if (type === "shipping") {
      setShipping(data.shipping);
      setEditingShipping(false);
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
      {/* 
      <FormWrapper
        isLocked={false}
        isCompleted={!!customerInfo}
        isEditing={editingCustomerInfo}
        onClick={() => setEditingCustomerInfo(true)}
        heading={"Kundinformation"}
        summary={customerInfo && 
        <div> 
        <p>{customerInfo.name}</p>
        <p>{customerInfo.address.street}</p>
        <p>{customerInfo.address.zipcode}</p>
        <p>{customerInfo.address.city}</p>
        </div>
        }
      >
        <CustomerInfoForm customerInfo={customerInfo} onSubmit={onSubmit} />
      </FormWrapper> */}

      <FormWrapper
        isLocked={false}
        isCompleted={!!shipping}
        isEditing={editingShipping}
        onClick={() => setEditingShipping(true)}
        heading={"Leverans"}
        summary={shipping && <p>{shipping}</p>}
      >
        <ShippingMethodForm shipping={shipping} onSubmit={onSubmit} />
      </FormWrapper>

      {/* 
      <FormWrapper
        isLocked={false}
        isCompleted={!!payment}
        isEditing={editingPayment}
        onClick={() => setEditingPayment(true)}
        heading={"Betalning"}
        summary={payment && <p>{payment}</p>}
      >
        <PaymentMethodForm payment={payment} onSubmit={onSubmit} />
      </FormWrapper> */}
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
