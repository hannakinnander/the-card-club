import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ShippingType, ShippingForm } from "../../types/shipping";
import { shippingSchema } from "../../types/shipping";

const shippingMethods = ["Instabox", "Postnord", "DHL"];

interface IProps {
  shippingMethod?: ShippingType;
  onSubmit: (type: "shippingMethod", data: ShippingForm) => void;
}

const ShippingMethodForm = ({ shippingMethod, onSubmit }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
    mode: "onChange",
    defaultValues: {
      shippingMethod,
    },
  });

  return (
    <form
      className={" flex flex-col"}
      onSubmit={handleSubmit((data) => onSubmit("shippingMethod", data))}
    >
      {shippingMethods.map((method) => (
        <label key={method}>
          <input type="radio" value={method} {...register("shippingMethod")} />
          {method}
        </label>
      ))}
      {errors.shippingMethod && <p>{errors.shippingMethod.message}</p>}
      <button type="submit" disabled={isSubmitting}>
        Spara
      </button>
    </form>
  );
};

export default ShippingMethodForm;
