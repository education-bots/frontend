"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSupabaseBrowser from "@/lib/supabase/client";
import { updateProfile, changePassword, signOut, getProfile } from "./queries";
import type { ProfileFormSchema, ChangePasswordSchema } from "./schema";

export const useUserProfile = () => {
  const supabase = useSupabaseBrowser();

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getProfile(supabase),
    staleTime: Infinity, // Cache the data indefinitely until manually invalidated
    retry: 3,
  });
};

export const useProfile = () => {
  const supabase = useSupabaseBrowser();
  const router = useRouter();

  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileFormSchema) => updateProfile(supabase, data),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: ChangePasswordSchema) => changePassword(supabase, data),
    onSuccess: () => {
      toast.success("Password changed successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to change password");
    },
  });

  const signOutMutation = useMutation({
    mutationFn: () => signOut(supabase),
    onSuccess: () => {
      toast.success("Signed out successfully");
      router.push("/auth/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to sign out");
    },
  });

  return {
    updateProfile: updateProfileMutation.mutateAsync,
    changePassword: changePasswordMutation.mutateAsync,
    signOut: signOutMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    isSigningOut: signOutMutation.isPending,
  };
};
