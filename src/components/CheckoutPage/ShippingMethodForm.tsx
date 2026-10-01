import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ShippingType, ShippingForm } from "../../types/shipping";
import { shippingSchema } from "../../types/shipping";

const shippingMethods = ["Instabox", "Postnord", "DHL"];

interface IProps {
  shipping: ShippingType;
  onSubmit: (type: "shipping", data: ShippingForm) => void;
}

const ShippingMethodForm = ({ shipping, onSubmit }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
    mode: "onChange",
    defaultValues: {
      shipping,
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit("shipping", data))}>
      {shippingMethods.map((method) => (
        <label key={method}>
          <input type="radio" value={method} {...register("shipping")} />
          {method}
        </label>
      ))}
      {errors.shipping && <p>{errors.shipping.message}</p>}
      <button type="submit" disabled={isSubmitting}>
        Spara
      </button>
    </form>
  );
};

export default ShippingMethodForm;
