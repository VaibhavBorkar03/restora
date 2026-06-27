import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().nonempty("Restaurent name is required"),
  description: z.string().min(10, "Description is required"),
  price: z.number().positive("Price must be greate than 0"),
  image: z
    .instanceof(File)
    .nullable()
    .refine((file) => file?.size !== 0, { message: "image is required" }),
});

export type menuFormState = z.infer<typeof menuSchema>;
