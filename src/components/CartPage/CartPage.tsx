import useCart from "../../hooks/useCart";
import CartItem from "./CartItem";

const CartPage = () => {
  const { orderItems, changeQuantity } = useCart();
  return (
    <div>
      <section>
        {orderItems.map((orderItem) => (
          <div key={orderItem.product.id}>
            <CartItem orderItem={orderItem}>
              <p>{`Antal: ${orderItem.quantity}`}</p>
            </CartItem>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CartPage;
