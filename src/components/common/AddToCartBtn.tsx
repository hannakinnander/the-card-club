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
    label = `Maxantal i varukorg (${quantityInCart} st)`;
  } else if (quantityInCart > 0) {
    label = `Lägg till fler (${quantityInCart} i varukorg)`;
  }

  return (
    <button
      disabled={outOfStock || maxReached}
      onClick={() => addOrderItem(product)}
      className={
        className ??
        "w-full max-w-30 bg-black px-3 py-1.5 text-sm font-medium text-white"
      }
    >
      {label}
    </button>
  );
};

export default AddToCartBtn;
