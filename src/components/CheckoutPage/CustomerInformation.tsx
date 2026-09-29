import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const customerSchema = z.object({
  firstName: z.string().trim().min(1, "Förnamn måste fyllas i"),
  lastName: z.string().trim().min(1, "Efternamn måste fyllas i"),
  address: z.string().trim().min(1, "Adress måste fyllas i"),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Postnummer måste vara 5 siffror"),
  city: z.string().trim().min(1, "Stad måste fyllas i"),
});

export type CustomerInfo = z.infer<typeof customerSchema>;

interface CustomerInformationProps {
  onSave?: (data: CustomerInfo) => void;
}

const CustomerInformation = ({ onSave }: CustomerInformationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerInfo>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = (data: CustomerInfo) => {
    onSave?.(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto my-8 flex w-full max-w-md flex-col gap-3 rounded-lg border border-gray-200 p-6"
    >
      <div className="flex flex-col">
        <label htmlFor="firstName">Förnamn</label>
        <input id="firstName" {...register("firstName")} className="rounded border px-2 py-1" />
        {errors.firstName && (
          <p className="text-sm text-red-600">{errors.firstName.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="lastName">Efternamn</label>
        <input id="lastName" {...register("lastName")} className="rounded border px-2 py-1" />
        {errors.lastName && (
          <p className="text-sm text-red-600">{errors.lastName.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="address">Adress</label>
        <input id="address" {...register("address")} className="rounded border px-2 py-1" />
        {errors.address && (
          <p className="text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="zipCode">Postnummer</label>
        <input
          id="zipCode"
          inputMode="numeric"
          maxLength={5}
          {...register("zipCode")}
          className="rounded border px-2 py-1"
        />
        {errors.zipCode && (
          <p className="text-sm text-red-600">{errors.zipCode.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="city">Stad</label>
        <input id="city" {...register("city")} className="rounded border px-2 py-1" />
        {errors.city && (
          <p className="text-sm text-red-600">{errors.city.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 rounded bg-black px-3 py-2 text-sm font-medium text-white"
      >
        Spara och fortsätt
      </button>
    </form>
  );
};

export default CustomerInformation;
