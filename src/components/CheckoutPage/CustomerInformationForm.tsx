import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { CustomerInfo } from "../../types/customerInfo";
import { customerInfoSchema } from "../../types/customerInfo";

const fields: { name: keyof CustomerInfo; label: string }[] = [
  { name: "firstName", label: "Förnamn" },
  { name: "lastName", label: "Efternamn" },
  { name: "address", label: "Adress" },
  { name: "zipCode", label: "Postnummer" },
  { name: "city", label: "Stad" },
];

interface IProps {
  customerInfo?: CustomerInfo;
  onSubmit: (type: "customerInfo", data: CustomerInfo) => void;
}

const CustomerInformationForm = ({ customerInfo, onSubmit }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerInfo>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: customerInfo,
  });

  return (
    <form
      className={"flex flex-col gap-3"}
      onSubmit={handleSubmit((data) => onSubmit("customerInfo", data))}
    >
      {fields.map(({ name, label }) => (
        <div key={name} className={"flex flex-col"}>
          <label className="text-sm" htmlFor={name}>
            {label}
          </label>
          <input
            id={name}
            {...register(name)}
            {...(name === "zipCode" && { inputMode: "numeric", maxLength: 5 })}
            className="rounded  bg-white/70 px-2 py-1 text-black text-sm"
          />
          {errors[name] && (
            <p className="text-sm text-red-600">{errors[name].message}</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={isSubmitting}
        className=" bg-gray-300 border border-black text-sm font-medium text-black"
      >
        OK
      </button>
    </form>
  );
};

export default CustomerInformationForm;
