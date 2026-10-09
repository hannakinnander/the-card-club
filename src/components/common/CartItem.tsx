import type { OrderItem } from "../../types/orderItem";
import { Link } from "react-router-dom";
interface IProps {
  orderItem: OrderItem;
  children: React.ReactNode;
}

const CartItem = ({ orderItem, children }: IProps) => {
  return (
    <div className="flex text-xs sm:text-sm xl:text-base gap-3 mb-3 w-full max-w-200">
      <div className="flex items-center gap-3 w-full sm:w-70">
        <Link to={`/details/${orderItem.product.id}`}>
          <img
            className="w-10 sm:w-15"
            src={`/card-images/${orderItem.product.img}`}
            alt={orderItem.product.title}
          />
        </Link>
        <div className="min-w-fit">
          <p>{orderItem.product.title}</p>
          <p className="text-gray-500">{`Pris/st: ${orderItem.price} SEK`}</p>
        </div>
      </div>
      {children}
      <p className="text-end place-self-center w-30 sm:w-50">
        {orderItem.quantity * orderItem.price} SEK
      </p>
    </div>
  );
};

export default CartItem;
