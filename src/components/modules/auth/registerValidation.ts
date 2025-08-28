import { z } from "zod";

// export const registrationSchema = z.object({
//   name: z
//     .string({ required_error: "Name is required" })
//     .min(2, "Name must be between 2 and 50 characters")
//     .max(50, "Name must be between 2 and 50 characters"),
//   email: z
//     .string({ required_error: "Email is required" })
//     .email("Invalid email address"),
//   password: z
//     .string({ required_error: "Password is required" })
//     .min(8, "Password must be at least 8 characters"),
//   passwordConfirm: z
//     .string({ required_error: "Password Confirmation is required" })
//     .min(1),
// });
export const registrationSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
  }),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  passwordConfirm: z.string().min(1, "Password Confirmation is required"),
});
