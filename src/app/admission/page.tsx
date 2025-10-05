"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import toast from "react-hot-toast";

// Define validation schema
const admissionSchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters"),
  parentEmail: z.string().email("Invalid email address"),
  age: z.number().min(3, "Age must be at least 3").max(18, "Age must be 18 or less"),
});

type AdmissionSchema = z.infer<typeof admissionSchema>;

export default function AdmissionPage() {
  const form = useForm<AdmissionSchema>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      studentName: "",
      parentEmail: "",
      age: undefined,
    },
  });

  const onSubmit = async (values: AdmissionSchema) => {
    try {
      // Here you would typically send the data to your API
      console.log("Form Submitted ✅", values);
      toast.success("Admission form submitted successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to submit admission form");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">🎓 Admission Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <FormField
                control={form.control}
                name="parentEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter parent email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
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
        </CardContent>
      </Card>
    </div>
  );
}
