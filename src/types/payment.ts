import { z } from "zod";

export const paymentSchema = z.object({
  paymentMethod: z.enum(["Kort", "Swish"], {
    required_error: "Du måste välja ett fraktalternativ",
    message: "Något gick fel",
  }),
});

export type PaymentForm = z.infer<typeof paymentSchema>;

export type PaymentType = PaymentForm["paymentMethod"];
