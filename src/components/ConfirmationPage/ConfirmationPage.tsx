import { useNavigate, useParams } from "react-router-dom";
import { useGetOrder } from "../../hooks/useGetOrder";
import dayjs from "dayjs";
import CartItem from "../common/CartItem";
import { calculateTotal } from "../common/Total";

const ConfirmationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: order,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrder(id!);

  return (
    <div className={"page-container"}>
      <div className={"flex flex-col gap-10 items-center"}>
        <div className={"flex flex-col items-center justify-center gap-3"}>
          {isLoading ? (
            <p className="text-white">Laddar...</p>
          ) : (
            <>
              {isError ? (
                <>
                  <p className="text-red-600">{error.message}</p>
                  <button
                    className="text-white text-sm bg-none border-none p-0 underline"
                    onClick={() => window.location.reload()}
                  >
                    Försök igen
                  </button>
                </>
              ) : (
                <h2 className={"large-text text-white"}>Tack för din order!</h2>
              )}

              <button
                onClick={() => navigate("/")}
                className={"bg-green-700 p-2"}
              >
                Till startsidan ⏎
              </button>
            </>
          )}
        </div>

        {isSuccess && (
          <div
            className={
              " relative rounded-lg  p-5 sm:p-10 flex flex-col gap-3 border bg-gray-300 w-fit "
            }
          >
            <img
              src="/Logo/Logoicon.png"
              className={"h-15 w-auto absolute top-3 right-3"}
            />
            <h3 className={"text-xl font-semibold "}>Orderbekräftelse</h3>
            <div
              className={
                "flex justify-between gap-5 flex-wrap text-xs sm:text-sm "
              }
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
                  <CartItem orderItem={orderItem}>
                    <p
                      className={"self-center w-20"}
                    >{`Antal: ${orderItem.quantity}`}</p>
                  </CartItem>
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
        )}
      </div>
    </div>
  );
};
export default ConfirmationPage;
