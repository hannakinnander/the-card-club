import type { OrderItem } from "../../types/orderItem";

interface IProps {
  orderItem: OrderItem;
  children: React.ReactNode;
}

const CartItem = ({ orderItem, children }: IProps) => {
  return (
    <div className={"flex text-xs sm:text-sm xl:text-base gap-2 mb-3 "}>
      <div
        className={"flex flex-col sm:flex-row items-center gap-3 w-50 sm:w-70"}
      >
        <img
          className={"w-10 sm:w-20"}
          src={`/card-images/${orderItem.product.img}`}
          alt={orderItem.product.title}
        />
        <div>
          <p>{orderItem.product.title}</p>
          <p className={"text-gray-500"}>{`Pris/st: ${orderItem.price} SEK`}</p>
        </div>
      </div>
      {children}
      <p className={"text-end place-self-center w-30 sm:w-50"}>
        {orderItem.quantity * orderItem.price} SEK
      </p>
    </div>
  );
};

export default CartItem;
