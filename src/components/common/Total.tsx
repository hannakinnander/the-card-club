import useCart from "../../hooks/useCart";
import type { OrderItem } from "../../types/orderItem";

export const calculateTotal = (orderItems: OrderItem[]) => {
  return orderItems.reduce(
    (sum, orderItem) => sum + orderItem.quantity * orderItem.price,
    0,
  );
};

const Total = () => {
  const { orderItems } = useCart();

  return <p className={""}>{`Summa: ${calculateTotal(orderItems)} SEK`}</p>;
};

export default Total;
