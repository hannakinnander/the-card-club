import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import CartItem from "../common/CartItem";
import QuantityChanger from "./QuantityChanger";
import Total from "../common/Total";
import GoBackBtn from "../common/GoBackBtn";

const CartPage = () => {
  const { orderItems } = useCart();

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
    <div className={"page-container text-white"}>
      <GoBackBtn>Fortsätt handla</GoBackBtn>
      <h2 className={""}>Varukorg</h2>
      <div className={"bg-gray-800 p-5 rounded-2xl min-w-80 min-h-40 xl:w-300"}>
        {cartContent()}
      </div>
      <Total />
      <button
        onClick={() => navigate("/checkout")}
        disabled={orderItems.length === 0}
        className={"bg-amber-300 sm:w-75  text-black text-lg"}
      >
        Till kassan
      </button>
    </div>
  );
};

export default CartPage;
