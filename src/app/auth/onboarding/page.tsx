"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, School } from "lucide-react";
import { onboardingSchema, OnboardingSchema } from "@/features/auth/schema";
import { useAuth } from "@/features/auth/hooks";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { completeOnboarding, isPending } = useAuth();

  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      role: "student",
      language: "Urdu",
      dob: "",
      studentRollNo: "",
    },
  });

  const roles = [
    { value: "student", label: "Student", icon: GraduationCap },
    { value: "teacher", label: "Teacher", icon: School },
  ];

  const languages = ["Urdu", "English", "Arabic", "French", "Chinese"];

  const onSubmit = async (data: OnboardingSchema) => {
    try {
      await completeOnboarding.mutateAsync(data);
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 px-4">
      <Card className="w-full max-w-lg shadow-xl border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Step {step} of 3
          </CardTitle>
          <p className="text-center text-gray-500 text-sm mt-1">
            {step === 1 && "Choose your role"}
            {step === 2 && "Select your preferences"}
            {step === 3 && "Confirm your details"}
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
            {step === 1 && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select your role</FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                      {roles.map(({ value, label, icon: Icon }) => (
                        <div
                          key={value}
                          role="button"
                          tabIndex={0}
                          onClick={() => field.onChange(value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") field.onChange(value);
                          }}
                          className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md ${
                            field.value === value
                              ? "border-2 border-indigo-600 bg-indigo-50"
                              : "border-gray-200"
                          }`}
                        >
                          <Icon
                            size={32}
                            className={`${
                              field.value === value ? "text-indigo-600" : "text-gray-500"
                            }`}
                          />
                          <span
                            className={`font-medium ${
                              field.value === value ? "text-indigo-600" : "text-gray-700"
                            }`}
                          >
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 2 && (
              <>
                {form.watch("role") === "parent" && (
                  <FormField
                    control={form.control}
                    name="studentRollNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student Roll Number</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Student Roll No"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 3 && (
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Role:</strong> {form.watch("role")}
                </p>
                {form.watch("role") === "parent" && (
                  <p>
                    <strong>Student Roll No:</strong> {form.watch("studentRollNo")}
                  </p>
                )}
                <p>
                  <strong>Language:</strong> {form.watch("language")}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {form.watch("dob") || "Not provided"}
                </p>
              </div>
            )}

            <div className="flex justify-between gap-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                type={step < 3 ? "button" : "submit"}
                onClick={step < 3 ? () => setStep(step + 1) : undefined}
                disabled={isPending}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-medium shadow hover:opacity-90 rounded-xl"
              >
                {isPending ? "Saving..." : step < 3 ? "Next" : "Finish"}
              </Button>
            </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
