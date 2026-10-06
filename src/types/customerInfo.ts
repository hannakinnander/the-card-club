import { z } from "zod";

export const customerInfoSchema = z.object({
  firstName: z.string().trim().min(1, "Förnamn måste fyllas i"),
  lastName: z.string().trim().min(1, "Efternamn måste fyllas i"),
  address: z.string().trim().min(1, "Adress måste fyllas i"),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Postnummer måste vara 5 siffror"),
  city: z.string().trim().min(1, "Stad måste fyllas i"),
});

export type CustomerInfo = z.infer<typeof customerInfoSchema>;
