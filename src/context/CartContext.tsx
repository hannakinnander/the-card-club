import { createContext, useState, type PropsWithChildren } from "react";
import { type OrderItem } from "../types/orderItem";
import type { IProduct } from "../types/product";

interface ICartContext {
  orderItems: OrderItem[];
  addOrderItem: (product: IProduct) => void;
}

const CartContext = createContext<ICartContext | null>(null);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addOrderItem = (product: IProduct) => {
    const existingItem = orderItems.find(
      (orderItem) => orderItem.product.id === product.id,
    );
    if (existingItem) {
      setOrderItems((prev) =>
        prev.map((orderItem) =>
          orderItem.product.id === product.id
            ? { ...orderItem, quantity: orderItem.quantity++ }
            : orderItem,
        ),
      );
    } else {
      setOrderItems((prev) => [
        ...prev,
        { product: product, quantity: 1, price: product.price },
      ]);
    }
  };

  return (
    <CartContext.Provider value={{ orderItems, addOrderItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
