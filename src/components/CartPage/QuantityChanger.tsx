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
    <div
      className={
        "justify-center flex-1 flex h-fit self-center items-center relative"
      }
    >
      <p
        className={"amount-btn"}
        onClick={() => handleChange(orderItem.product, "decrease")}
      >
        -
      </p>
      <p className="w-10 text-center">{orderItem.quantity}</p>
      <div
        className="amount-btn"
        onClick={() => handleChange(orderItem.product, "increase")}
      >
        +
      </div>
      <button
        className="text-base sm:text-xl"
        onClick={() => deleteItem(orderItem.product)}
      >
        🗑️
      </button>
      <p className="text-xs sm:text-sm absolute -bottom-4 ">{error}</p>
    </div>
  );
};

export default QuantityChanger;
