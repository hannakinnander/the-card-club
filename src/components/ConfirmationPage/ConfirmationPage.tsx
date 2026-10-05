import { useParams } from "react-router-dom";
import { useGetOrder } from "../../hooks/useGetOrder";

const ConfirmationPage = () => {
  const id = useParams().toString();
  const { data: order, isLoading, isError, isSuccess } = useGetOrder(id);

  if (isSuccess)
    if (isLoading) {
      return <p>Laddar...</p>;
    } else if (isSuccess) {
      return (
        <div>
          <div>
            <h2>Orderbekräftelse</h2>
            <div>
              <p>{`Ordernummer: ${order.ordernumber}`}</p>
              <p>{`Datum: ${order.date}`}</p>
            </div>
          </div>
        </div>
      );
    } else return <p>Kunde inte hitta order</p>;
};
export default ConfirmationPage;
