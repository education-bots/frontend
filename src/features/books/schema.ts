import { z } from "zod";

export const bookUploadSchema = z.object({
  title: z
    .string({ message: "Book title is required" })
    .min(1, { message: "Book title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  subject: z
    .string({ message: "Subject is required" })
    .min(1, { message: "Subject is required" })
    .max(100, { message: "Subject must be less than 100 characters" }),
  class_level: z
    .string({ message: "Class level is required" })
    .min(1, { message: "Class level is required" })
    .max(50, { message: "Class level must be less than 50 characters" }),
  file: z
    .instanceof(File, { message: "PDF file is required" })
    .refine((file) => file.type === "application/pdf", {
      message: "File must be a PDF",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "File size must be less than 10MB",
    }),
});

export type BookUploadSchema = z.infer<typeof bookUploadSchema>;
