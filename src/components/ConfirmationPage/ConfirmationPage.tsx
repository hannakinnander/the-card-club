import { useNavigate, useParams } from "react-router-dom";
import { useGetOrder } from "../../hooks/useGetOrder";
import dayjs from "dayjs";
import CartItem from "../common/CartItem";
import { calculateTotal } from "../common/Total";

const ConfirmationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    return <p>Något gick fel, kan inte hämta order.</p>;
  }
  const { data: order, isLoading, isSuccess } = useGetOrder(id);

  if (!isSuccess) {
    return (
      <p>{`${isLoading ? "Laddar..." : "Kunde inte hämta order. Vänligen kontakta kundtjänst."}`}</p>
    );
  }

  return (
    <div className={"flex flex-wrap justify-center p-3 sm:p-10 gap-10"}>
      <div
        className={
          "flex flex-col items-center justify-center gap-3 flex-1 min-w-fit"
        }
      >
        <h2 className={"large-text text-white"}>Tack för din order!</h2>
        <button onClick={() => navigate("/")} className={"bg-green-700 p-2"}>
          Till startsidan ⏎
        </button>
      </div>

      <div
        className={
          " relative rounded-2xl w-250 p-5 sm:p-10 flex flex-col gap-3 border bg-gray-100 "
        }
      >
        <img
          src="/Logo/Logoicon.png"
          className={"h-15 w-auto absolute top-3 right-3"}
        />
        <h3 className={"text-xl font-semibold "}>Orderbekräftelse</h3>
        <div
          className={"flex justify-between gap-5 flex-wrap text-xs sm:text-sm "}
        >
          <div className={"min-w-fit"}>
            <p>
              {order.customerInfo.firstName} {order.customerInfo.lastName}
            </p>
            <p>{order.customerInfo.address}</p>
            <p>
              {order.customerInfo.zipCode} {order.customerInfo.city}
            </p>
          </div>
          <div className={"min-w-fit"}>
            <p>{dayjs(order.date).format("YYYY-MM-DD HH:MM")}</p>
            <p>{`Ordernummer: ${order.ordernumber}`}</p>
            <p>{`Betalsätt: ${order.paymentMethod}`}</p>
            <p>{`Frakt: ${order.shippingMethod}`}</p>
          </div>
        </div>
        <div>
          <h4 className={"font-semibold"}>Produkter</h4>
          {order.orderItems.map((orderItem) => (
            <div key={orderItem.product.id}>
              <CartItem
                orderItem={orderItem}
              >{`Antal: ${orderItem.quantity}`}</CartItem>
            </div>
          ))}
        </div>
        <p
          className={"font-semibold"}
        >{`Totalsumma: ${calculateTotal(order.orderItems)} SEK`}</p>
        <p className={"self-end text-xs sm:text-sm text-gray-500"}>
          The Card Club©︎ |
          <a href="mailto:info@thecardclub.com"> info@thecardclub.com</a>
        </p>
      </div>
    </div>
  );
};
export default ConfirmationPage;
