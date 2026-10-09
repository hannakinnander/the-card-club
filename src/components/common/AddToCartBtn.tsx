import useCart from "../../hooks/useCart";
import type { IProduct } from "../../types/product";

interface AddToCartBtnProps {
  product: IProduct;
  className?: string;
}

const AddToCartBtn = ({ product, className }: AddToCartBtnProps) => {
  const { orderItems, addOrderItem } = useCart();
  const quantityInCart =
    orderItems.find((orderItem) => orderItem.product.id === product.id)
      ?.quantity ?? 0;
  const outOfStock = product.inventory === 0;
  const maxReached = !outOfStock && quantityInCart >= product.inventory;

  let label = "Lägg i varukorg";
  if (outOfStock) {
    label = "Slut i lager";
  } else if (maxReached) {
    label = `Max i varukorg (${quantityInCart} st)`;
  } else if (quantityInCart > 0) {
    label = `Lägg till fler (${quantityInCart})`;
  }

  return (
    <button
      disabled={outOfStock || maxReached}
      onClick={() => addOrderItem(product)}
      className={`${className} bg-green-800 inset-shadow-green-500 inset-shadow-sm/80 0 text-sm font-medium text-gray-50 disabled:inset-shadow-none`}
    >
      {label}
    </button>
  );
};

export default AddToCartBtn;
