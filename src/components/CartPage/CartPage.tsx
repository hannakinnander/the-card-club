import { Link, Navigate, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import CartItem from "../common/CartItem";
import QuantityChanger from "./QuantityChanger";
import Total from "../common/Total";

const CartPage = () => {
  const { orderItems } = useCart();
  const savedFilters = sessionStorage.getItem("productFilters");
  const navigate = useNavigate();

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
      <Link to={savedFilters ? `/?${savedFilters}` : "/"}>
        ← Fortsätt handla
      </Link>
      <h2>Varukorg</h2>
      {cartContent()}
      <Total />
      <button
        onClick={() => navigate("/checkout")}
        disabled={orderItems.length === 0}
        className={"bg-amber-300 disabled:opacity-50"}
      >
        Till kassan
      </button>
    </div>
  );
};

export default CartPage;
