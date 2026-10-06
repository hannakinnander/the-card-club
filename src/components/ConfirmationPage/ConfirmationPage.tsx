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
    <div className={"flex flex-wrap m-2 gap-3 "}>
      <div
        className={
          "flex flex-col items-center justify-center gap-3 flex-1 min-w-fit"
        }
      >
        <h2 className={"text-2xl"}>Tack för din order!</h2>
        <button onClick={() => navigate("/")} className={"bg-amber-200 p-2"}>
          Till startsidan ⏎
        </button>
      </div>
      <div className={"flex flex-col gap-1"}>
        <button className={"self-end bg-amber-300"}>
          <img
            src="/icons/download.png"
            alt="ladda ner"
            className={"h-6 w-auto"}
          />
        </button>
        <div
          id="order-confirmation"
          className={" relative border w-200 p-10 flex flex-col gap-3"}
        >
          <p className={"absolute bottom-1 self-center text-sm text-gray-500"}>
            The Card Club©︎ |
            <a href="mailto:info@thecardclub.com"> info@thecardclub.com</a>
          </p>
          <img
            src="/Logo/Logoicon.png"
            className={"h-15 w-auto absolute top-3 right-3"}
          />
          <h3 className={"text-xl"}>Orderbekräftelse</h3>
          <div className={"flex justify-between text-sm"}>
            <div>
              <p>
                {order.customerInfo.firstName} {order.customerInfo.lastName}
              </p>
              <p>{order.customerInfo.address}</p>
              <p>
                {order.customerInfo.zipCode} {order.customerInfo.city}
              </p>
            </div>
            <div>
              <p>{dayjs(order.date).format("YYYY-MM-DD HH:MM")}</p>
              <p>{`Ordernummer: ${order.ordernumber}`}</p>
              <p>{`Betalsätt: ${order.paymentMethod}`}</p>
              <p>{`Frakt: ${order.shippingMethod}`}</p>
            </div>
          </div>
          <div>
            <h4>Produkter</h4>
            {order.orderItems.map((orderItem) => (
              <div key={orderItem.product.id}>
                <CartItem
                  orderItem={orderItem}
                >{`Antal: ${orderItem.quantity}`}</CartItem>
              </div>
            ))}
          </div>
          <p>{`Totalsumma: ${calculateTotal(order.orderItems)} SEK`}</p>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationPage;
