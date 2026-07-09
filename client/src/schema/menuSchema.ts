import { z } from "zod";

export const menuSchema = z.object({
  _id: z.string().optional(),
  name: z.string().nonempty("Restaurent name is required"),
  description: z.string().min(10, "Description is required"),
  price: z.number().positive("Price must be greate than 0"),
  image: z
    .any()
    .refine((file) => file instanceof File, { message: "Image is required" }),
});

export type menuFormState = z.infer<typeof menuSchema>;
