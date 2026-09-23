import type { ReactNode } from "react";
import useCart from "../../hooks/useCart";
import type { IProduct } from "../../types/product";

const AddToCartBtn = ({
  product,
  children,
  className,
}: {
  product: IProduct;
  children: ReactNode;
  className?: string;
}) => {
  const { addOrderItem } = useCart();
  return (
    <button
      disabled={product.inventory === 0}
      onClick={() => addOrderItem(product)}
      className={className}
    >
      {children}
    </button>
  );
};

export default AddToCartBtn;
