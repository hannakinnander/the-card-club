import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import CartItem from "../common/CartItem";
import QuantityChanger from "./QuantityChanger";
import Total from "../common/Total";
import GoBackBtn from "../common/GoBackBtn";
import { useEffect } from "react";

const CartPage = () => {
  const { orderItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="page-container text-white">
      <div className="flex flex-col gap-5">
        <GoBackBtn>Fortsätt handla</GoBackBtn>
        <h2>Varukorg</h2>

        <div
          className={`bg-gray-800 p-5 rounded-lg w-full ${orderItems.length === 0 ? "max-w-200 h-40" : "sm:max-w-fit"}`}
        >
          {cartContent()}
        </div>
        <Total />
        <button
          onClick={() => navigate("/checkout")}
          disabled={orderItems.length === 0}
          className="bg-amber-500 sm:w-75  text-black text-lg"
        >
          Till kassan
        </button>
      </div>
    </div>
  );
};

export default CartPage;
