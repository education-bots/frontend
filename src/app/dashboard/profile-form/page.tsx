"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profileFormSchema, ProfileFormSchema } from "@/features/profile/schema";
import { useProfile } from "@/features/profile/hooks";
import { useState } from "react";

interface Profile {
  full_name?: string;
  class_level?: string;
  date_of_birth?: string;
}

export default function ProfileForm({ profile }: { profile: Profile }) {
  const { updateProfile, changePassword, signOut, isUpdating, isChangingPassword, isSigningOut } = useProfile();
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const form = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      class_level: profile?.class_level || "",
      date_of_birth: profile?.date_of_birth || "",
    },
  });

  const onSubmit = async (data: ProfileFormSchema) => {
    try {
      await updateProfile(data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleChangePassword = async () => {
    const newPass = prompt("Enter new password:");
    if (!newPass) return;
    try {
      await changePassword({
        currentPassword: "", // This would need to be collected from a form
        newPassword: newPass,
        confirmPassword: newPass,
      });
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
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
                    <Input placeholder="Enter your full name" {...field} />
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
                    <Input placeholder="e.g. class-5" {...field} />
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

            <Button type="submit" disabled={isUpdating} className="w-full">
              {isUpdating ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </Form>

        <div className="flex gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleChangePassword}
            disabled={isChangingPassword}
            className="flex-1"
          >
            {isChangingPassword ? "Changing..." : "Change Password"}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex-1"
          >
            {isSigningOut ? "Signing Out..." : "Sign Out"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
