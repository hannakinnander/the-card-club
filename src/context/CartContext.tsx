import { createContext, useState, type PropsWithChildren } from "react";
import { type OrderItem } from "../types/orderItem";
import type { IProduct } from "../types/product";

interface ICartContext {
  orderItems: OrderItem[];
  addOrderItem: (product: IProduct) => boolean;
  deleteItem: (product: IProduct) => void;
  changeQuantity: (
    product: IProduct,
    change: "increase" | "decrease",
  ) => boolean;
}

const CartContext = createContext<ICartContext | null>(null);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addOrderItem = (product: IProduct) => {
    const existingItem = orderItems.find(
      (orderItem) => orderItem.product.id === product.id,
    );
    if (existingItem) {
      if (existingItem.quantity === product.inventory) {
        return false;
      }
      setOrderItems((prev) =>
        prev.map((orderItem) =>
          orderItem.product.id === product.id
            ? { ...orderItem, quantity: orderItem.quantity++ }
            : orderItem,
        ),
      );
      return true;
    } else {
      setOrderItems((prev) => [
        ...prev,
        { product: product, quantity: 1, price: product.price },
      ]);
      return true;
    }
  };

  const deleteItem = (product: IProduct) => {
    setOrderItems((prev) =>
      prev.filter((orderItem) => orderItem.product.id != product.id),
    );
  };

  const changeQuantity = (
    product: IProduct,
    change: "increase" | "decrease",
  ) => {
    if (change === "increase") {
      const item = orderItems.find(
        (orderItem) => orderItem.product.id === product.id,
      );

      if (!item) return;
      if (item.quantity === product.inventory) {
        return false;
      }
      setOrderItems((prev) =>
        prev.map((orderItem) =>
          orderItem.product.id === product.id
            ? { ...orderItem, quantity: orderItem.quantity++ }
            : orderItem,
        ),
      );
      return true;
    } else {
      setOrderItems((prev) =>
        prev.map((orderItem) =>
          orderItem.product.id === product.id && orderItem.quantity >= 2
            ? { ...orderItem, quantity: orderItem.quantity-- }
            : orderItem,
        ),
      );
      return true;
    }
  };
  return (
    <CartContext.Provider value={{ orderItems, addOrderItem, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
