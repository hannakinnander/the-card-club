import type { ReactNode } from "react";
import useCart from "../../hooks/useCart";
import type { IProduct } from "../../types/product";

const AddToCartBtn = ({ product, children }: { product: IProduct; children: ReactNode }) => {
  const { addOrderItem } = useCart();
  return (
    <button
      disabled={product.inventory === 0}
      onClick={() => addOrderItem(product)}
    >
      {children}
    </button>
  );
};

export default AddToCartBtn;
