import { z } from "zod";

export const profileFormSchema = z.object({
  full_name: z
    .string({ message: "Full name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  class_level: z
    .string({ message: "Class level is required" })
    .min(1, { message: "Class level is required" }),
  date_of_birth: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z
    .string({ message: "Current password is required" })
    .min(1, { message: "Current password is required" }),
  newPassword: z
    .string({ message: "New password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string({ message: "Confirm password is required" })
    .min(8, { message: "Confirm password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
