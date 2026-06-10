import { z } from "zod";

export const signUpSchema = z.object({
  fullname: z.string().min(3, "Fullname is required"),
  email: z.string().min(3, "Invalid email address"),
  password: z.string().min(6, "Password conatain at least 6 character"),
  contact: z.string().min(10, "Mobile number must be 10 characters"),
});

export type SignUpInputState = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "Invalid Email Address"),
  password: z.string().min(6, "Password at least 6 characters"),
});

export type LoginInputState = z.infer<typeof loginSchema>;
