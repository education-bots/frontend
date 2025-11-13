import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .min(2, { message: "Email is required" })
    .max(50),
  password: z
    .string({ message: "Password is required" })
    .min(1, { message: "Password is required" })
    .refine((val) => val.length >= 8, {
      message: "Password must be at least 8 characters",
    }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z
  .object({
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email address" })
      .max(50),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string({ message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string({ message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const onboardingSchema = z.object({
  role: z.enum(["student", "teacher", "parent"], {
    error: "Role is required",
  }),
  language: z.string().min(1, { message: "Language is required" }),
  dob: z.string().optional(),
  studentRollNo: z.string().optional(),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;

