"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profileFormSchema, ProfileFormSchema } from "@/features/profile/schema";
import { useProfile } from "@/features/profile/hooks";

export default function ProfilePage() {
  const { updateProfile, isUpdating } = useProfile();

  const form = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: "",
      class_level: "",
      date_of_birth: "",
    },
  });

  const onSubmit = async (data: ProfileFormSchema) => {
    try {
      await updateProfile(data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      <p className="text-gray-500">Update your personal information.</p>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="class_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Level</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Class" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isUpdating} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                {isUpdating ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
