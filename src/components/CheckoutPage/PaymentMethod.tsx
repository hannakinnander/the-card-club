import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, type PaymentForm } from "../../types/payment";

interface IProps {
  onSubmit: (type: "payment", data: PaymentForm) => void;
}

const PaymentMethod = ({ onSubmit }: IProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PaymentForm>({
        resolver: zodResolver(paymentSchema),
        mode: "onChange",
    });


    return (
        <form onSubmit={handleSubmit(data => onSubmit("payment", data))}>
            <label>
                <input
                    type="radio"
                    value="Kort"
                    {...register("paymentMethod")} />
                Kort
            </label>
            <label>
                <input
                    type="radio"
                    value="Swish"
                    {...register("paymentMethod")} />
                Swish
            </label>
            {errors.paymentMethod && (
                <p>{errors.paymentMethod.message}</p>
            )}
            <button type="submit">
                spara
            </button>
        </form>

    );
};
export default PaymentMethod;