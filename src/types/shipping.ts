import { z } from "zod";

export const shippingSchema = z.object({
  shippingMethod: z.enum(["Instabox", "Postnord", "DHL"], {
    message: "Du måste välja ett fraktalternativ",
  }),
});

export type ShippingForm = z.infer<typeof shippingSchema>;

export type ShippingType = ShippingForm["shippingMethod"];
