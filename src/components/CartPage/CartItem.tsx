import type { OrderItem } from "../../types/orderItem";

const CartItem = (orderItem: OrderItem) => {
  return (
    <div>
      <div>
        <img
          src={`/card-images/${orderItem.product.img}`}
          alt={orderItem.product.title}
        />
        <div>
          <p>{orderItem.product.title}</p>
          <p>`Pris/st: ${orderItem.product.title}`</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
