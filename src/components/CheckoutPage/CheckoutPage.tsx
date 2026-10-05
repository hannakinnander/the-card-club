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
import type { INewOrder, IOrder } from "../../types/order";
import type { PaymentForm, PaymentType } from "../../types/payment";
import PaymentMethodForm from "./PaymentMethod";
import { usePostOrder } from "../../hooks/usePostOrder";
import { useUpdateInventory } from "../../hooks/useUpdateInventory";
import { useQueryClient } from "@tanstack/react-query";
import type { ICheckoutData } from "../../types/checkoutData";

const CheckoutPage = () => {
  const { orderItems } = useCart();
  const [checkoutData, setCheckoutData] = useState<ICheckoutData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<
    "customerInfo" | "shipping" | "payment" | null
  >(null);
  const formsCompleted =
    !!checkoutData.customerInfo &&
    !!checkoutData.shippingMethod &&
    !!checkoutData.paymentMethod;
  const { mutateAsync: postOrder } = usePostOrder();
  const { mutateAsync: updateInventory } = useUpdateInventory();
  const queryClient = useQueryClient();

  const handleOrder = async () => {
    setIsSubmitting(true);

    try {
      const newOrder = createOrder();
      await postOrder(newOrder);
      await Promise.all(
        newOrder.orderItems.map((orderItem) =>
          updateInventory({
            id: orderItem.product.id,
            inventory: orderItem.product.inventory - orderItem.quantity,
          }),
        ),
      );
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      newOrder.orderItems.forEach((orderItem) =>
        queryClient.invalidateQueries({
          queryKey: ["product", orderItem.product.id],
        }),
      );
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const createOrder = () => {
    if (
      !checkoutData.customerInfo ||
      !checkoutData.shippingMethod ||
      !checkoutData.paymentMethod
    ) {
      throw new Error("Fyll i alla uppgifter innan du fortsätter.");
    }

    return {
      orderItems,
      customerInfo: checkoutData.customerInfo,
      shippingMethod: checkoutData.shippingMethod,
      paymentMethod: checkoutData.paymentMethod,
      total: calculateTotal(orderItems),
      date: new Date().toISOString(),
      ordernumber: Date.now(),
    };
  };

  const onSubmit = (
    type: "customerInfo" | "shippingMethod" | "paymentMethod",
    data: CustomerInfo | ShippingForm | PaymentForm,
  ) => {
    if (type === "customerInfo" && "firstName" in data) {
      setCheckoutData((prev) => ({
        ...prev,
        customerInfo: data,
      }));
    }

    if (type === "shippingMethod" && "shippingMethod" in data) {
      setCheckoutData((prev) => ({
        ...prev,
        shippingMethod: data.shippingMethod,
      }));
    }

    if (type === "paymentMethod" && "paymentMethod" in data) {
      setCheckoutData((prev) => ({
        ...prev,
        paymentMethod: data.paymentMethod,
      }));
    }

    setEditing(null);
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
      <div className={"flex flex-col gap-2 max-w-150"}>
        <FormWrapper
          isLocked={false}
          isCompleted={!!checkoutData.customerInfo}
          isEditing={editing === "customerInfo"}
          onClick={() => setEditing("customerInfo")}
          heading={"Kundinformation"}
          summary={
            checkoutData.customerInfo && (
              <div>
                <p>
                  {checkoutData.customerInfo.firstName}{" "}
                  {checkoutData.customerInfo.lastName}
                </p>
                <p>{checkoutData.customerInfo.address}</p>
                <p>
                  {checkoutData.customerInfo.zipCode}{" "}
                  {checkoutData.customerInfo.city}
                </p>
              </div>
            )
          }
        >
          <CustomerInformationForm
            customerInfo={checkoutData.customerInfo}
            onSubmit={onSubmit}
          />
        </FormWrapper>

        <FormWrapper
          isLocked={!checkoutData.customerInfo}
          isCompleted={!!checkoutData.shippingMethod}
          isEditing={editing === "shipping"}
          onClick={() => setEditing("shipping")}
          heading={"Leverans"}
          summary={
            checkoutData.shippingMethod && <p>{checkoutData.shippingMethod}</p>
          }
        >
          <ShippingMethodForm
            shippingMethod={checkoutData.shippingMethod}
            onSubmit={onSubmit}
          />
        </FormWrapper>

        <FormWrapper
          isLocked={!checkoutData.shippingMethod}
          isCompleted={!!checkoutData.paymentMethod}
          isEditing={editing === "payment"}
          onClick={() => setEditing("payment")}
          heading={"Betalning"}
          summary={
            checkoutData.paymentMethod && <p>{checkoutData.paymentMethod}</p>
          }
        >
          <PaymentMethodForm
            paymentMethod={checkoutData.paymentMethod}
            onSubmit={onSubmit}
          />
        </FormWrapper>
        <p>{error}</p>
        <button
          disabled={!formsCompleted || isSubmitting || editing !== null}
          className={"bg-green-400 disabled:opacity-50"}
          onClick={() => {}}
        >
          {`${isSubmitting ? "Behandlar order" : "Bekräfta order"}`}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
