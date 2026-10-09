import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  paymentSchema,
  type PaymentForm,
  type PaymentType,
} from "../../types/payment";

interface IProps {
  paymentMethod?: PaymentType;
  onSubmit: (type: "paymentMethod", data: PaymentForm) => void;
}

const PaymentMethod = ({ paymentMethod, onSubmit }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
    defaultValues: {
      paymentMethod,
    },
  });

  return (
    <form
      className=" flex flex-col gap-2"
      onSubmit={handleSubmit((data) => onSubmit("paymentMethod", data))}
    >
      <label>
        <input type="radio" value="Kort" {...register("paymentMethod")} /> Kort
      </label>
      <label>
        <input type="radio" value="Swish" {...register("paymentMethod")} />{" "}
        Swish
      </label>
      {errors.paymentMethod && (
        <p className="text-sm text-red-600">{errors.paymentMethod.message}</p>
      )}
      <button
        type="submit"
        className=" bg-gray-300 border border-black text-sm font-medium text-black"
      >
        OK
      </button>
    </form>
  );
};
export default PaymentMethod;
