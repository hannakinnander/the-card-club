import type { OrderItem } from "../../types/orderItem";

interface IProps {
  orderItem: OrderItem;
  children: React.ReactNode;
}
//CHILDREN = Visar antal. Justerbart antal i varukorg och endast antal i checkout/confirmation
const CartItem = ({ orderItem, children }: IProps) => {
  return (
    <div>
      <img
        src={`/card-images/${orderItem.product.img}`}
        alt={orderItem.product.title}
      />
      <div>
        <p>{orderItem.product.title}</p>
        <p>{`Pris/st: ${orderItem.product.price} SEK`}</p>
      </div>
      <div>
        {children}
        <p>{orderItem.quantity * orderItem.price} SEK</p>
      </div>
    </div>
  );
};

export default CartItem;
