import { z } from "zod";

export const restaurentSchema = z.object({
  restaurentName: z.string().nonempty("Restaurent Name is required"),
  city: z.string().nonempty("City at least contain 3 characters"),
  country: z.string().nonempty("Country contain at least 3 chracter"),
  deliveryTime: z
    .number()
    .min(0, { message: "Delivery time cannot be negative" }),
  cuisines: z.array(z.string()),
  imageFile: z
    .any()
    .refine((file) => file instanceof File, { message: "image is required" }),
});

export type restaurenInputState = z.infer<typeof restaurentSchema>;
