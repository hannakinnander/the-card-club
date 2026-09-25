import useCart from "../../hooks/useCart";

const Total = () => {
  const { orderItems } = useCart();
  const calculateTotal = () => {
    return orderItems.reduce(
      (sum, orderItem) => sum + orderItem.quantity * orderItem.price,
      0,
    );
  };
  return <p>{`Summa: ${calculateTotal()}`}</p>;
};

export default Total;
