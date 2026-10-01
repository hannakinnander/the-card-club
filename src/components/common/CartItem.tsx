import type { OrderItem } from "../../types/orderItem";

interface IProps {
  orderItem: OrderItem;
  children: React.ReactNode;
}

const CartItem = ({ orderItem, children }: IProps) => {
  return (
    <div className={"flex items-center justify-between max-w-150"}>
      <div className={"flex items-center gap-3"}>
        <img
          className={"w-20"}
          src={`/card-images/${orderItem.product.img}`}
          alt={orderItem.product.title}
        />
        <div>
          <p>{orderItem.product.title}</p>
          <p className={"text-sm"}>{`Pris/st: ${orderItem.price} SEK`}</p>
        </div>
      </div>
      {children}
      <p>{orderItem.quantity * orderItem.price} SEK</p>
    </div>
  );
};

export default CartItem;
