"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ✅ Validation Schema
const formSchema = z.object({
  studentName: z
    .string()
    .min(2, { message: "Student name must be at least 2 characters." }),
  parentEmail: z
    .string()
    .email({ message: "Enter a valid email." }),
  age: z.coerce
    .number({
      invalid_type_error: "Age is required",
    })
    .min(3, { message: "Age must be at least 3." })
    .max(18, { message: "Age must be under 18." }),
});

export default function AdmissionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      parentEmail: "",
      age: undefined, // keep it undefined so validation works
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert(`✅ Form Submitted: ${JSON.stringify(values, null, 2)}`);
    form.reset(); // reset form after submission
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl px-6 py-[60px] mt-[100px] shadow-lg">
      <h2 className="text-2xl font-bold mb-6">🎓 Admission Form</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Student Name */}
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter student name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Parent Email */}
          <FormField
            control={form.control}
            name="parentEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter parent email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Age */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter age"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>Age must be between 3 and 18.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
          >
            Submit Admission
          </Button>
        </form>
      </Form>
    </div>
  );
}
