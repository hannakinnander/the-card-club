import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import CartItem from "../common/CartItem";
import QuantityChanger from "./QuantityChanger";
import Total from "../common/Total";

const CartPage = () => {
  const { orderItems } = useCart();

  const cartContent = () => {
    if (orderItems.length === 0) {
      return <p>Varukorgen är tom</p>;
    } else {
      return (
        <section>
          {orderItems.map((orderItem) => (
            <div key={orderItem.product.id}>
              <CartItem orderItem={orderItem}>
                <QuantityChanger orderItem={orderItem} />
              </CartItem>
            </div>
          ))}
        </section>
      );
    }
  };

  return (
    <div>
      <Link to="/">← Fortsätt handla</Link>
      <h2>Varukorg</h2>
      {cartContent()}
      <Total />
      <Link to="/checkout">Till kassan</Link>
    </div>
  );
};

export default CartPage;
