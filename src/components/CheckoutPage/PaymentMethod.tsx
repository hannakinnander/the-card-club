import { z } from  "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";


const paymentSchema = z.object({
    paymentMethod: z.string().min(1, "Välj ett betalningsalternativ"),
    savePaymentMethod: z.boolean(),
});

type PaymentForm = z.infer<typeof paymentSchema>;

const PaymentMethod = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, 
  } = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema)
  });

  const onSubmit = (data: PaymentForm) => {
    console.log(data);
};


  return (
   <form onSubmit={handleSubmit(onSubmit)}>
    <label>
        <input
        type="radio"
        value="Kort"
        {...register("paymentMethod")}/>
        Kort
    </label>
    <label>
        <input
        type="radio"
        value="Swish"
        {...register("paymentMethod")}/>
        Swish
    </label>
    {errors.paymentMethod && (
        <p>{errors.paymentMethod.message}</p>
    )}
    <label>
        <input
        type="checkbox"
        {...register("savePaymentMethod")}/>
        Spara betalningsalternativ
    </label>
    <button type="submit">
        spara
    </button>
   </form> 
   
  );
};
export default PaymentMethod;