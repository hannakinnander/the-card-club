import { z } from "zod";

export const shippingSchema = z.object({
  shipping: z.enum(["Instabox", "Postnord", "DHL"], {
    required_error: "Du måste välja ett fraktalternativ",
    message: "Något gick fel",
  }),
});

export type ShippingForm = z.infer<typeof shippingSchema>;

export type ShippingType = ShippingForm["shipping"];
