import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import CartItem from "../common/CartItem";
import Total from "../common/Total";

const CheckoutPage = () => {
  const { orderItems } = useCart();

  return (
    <div>
      <Link to="/cart">Tillbaka</Link>
      <h2>Kassan</h2>
      <div>
        {orderItems.map((orderItem) => (
          <div key={orderItem.product.id}>
            <CartItem
              orderItem={orderItem}
            >{`Antal: ${orderItem.quantity}`}</CartItem>
          </div>
        ))}
        <Total />
      </div>
    </div>
  );
};

export default CheckoutPage;
