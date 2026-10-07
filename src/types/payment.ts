import { z } from "zod";

export const paymentSchema = z.object({
  paymentMethod: z.enum(["Kort", "Swish"], {
    message: "Du måste välja ett betalningslternativ",
  }),
});

export type PaymentForm = z.infer<typeof paymentSchema>;

export type PaymentType = PaymentForm["paymentMethod"];
