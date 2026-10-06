import { useState } from "react";
import useCart from "../../hooks/useCart";
import type { OrderItem } from "../../types/orderItem";
import type { IProduct } from "../../types/product";

interface IProps {
  orderItem: OrderItem;
}

const QuantityChanger = ({ orderItem }: IProps) => {
  const { changeQuantity, deleteItem } = useCart();
  const [error, setError] = useState<string>("");

  const handleChange = (product: IProduct, change: "increase" | "decrease") => {
    const success = changeQuantity(product, change);
    if (!success) {
      setError("Det finns inte fler i lager");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    setError("");
  };
  return (
    <div>
      <div className={"flex gap-3 items-center"}>
        <button
          className={"amount-btn"}
          onClick={() => handleChange(orderItem.product, "decrease")}
        >
          -
        </button>
        <p>{orderItem.quantity}</p>
        <button
          className={"amount-btn"}
          onClick={() => handleChange(orderItem.product, "increase")}
        >
          +
        </button>
        <button
          className={"text-xl"}
          onClick={() => deleteItem(orderItem.product)}
        >
          🗑️
        </button>
      </div>
      <p>{error}</p>
    </div>
  );
};

export default QuantityChanger;
