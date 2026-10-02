import { z } from "zod";

export const paymentSchema = z.object({
    paymentMethod: z.string().min(1, "Välj ett betalningsalternativ"),
   });


export type PaymentForm = z.infer<typeof paymentSchema>;
