"use client";

import useSupabaseBrowser from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";
import {
  ForgotPasswordSchema,
  LoginFormSchema,
  OnboardingSchema,
  RegisterFormSchema,
  ResetPasswordSchema,
} from "./schema";
import { AuthError } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useQuery as useQueryReactQuery } from "@tanstack/react-query";
import { getUserData } from "../auth/queries";

export const useAuth = () => {
  const supabase = useSupabaseBrowser();
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();


  const loginUser = useMutation({
    mutationFn: async (params: LoginFormSchema) => {
      const { email, password } = params;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error; 
      return data; 
    },
    onSuccess: () => {
      startTransition(() => {
        push("/dashboard");
      });
    },
    onError: (error: AuthError) => {
      console.error("Error signing in:", error.message);
      if (error.code === "invalid_credentials") {
        toast.error("Invalid email or password");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    },
  });

  const registerUser = useMutation({
    mutationFn: async (params: RegisterFormSchema) => {
      const { email, password } = params;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data.session) {
        toast.success("Welcome! Let’s complete your profile 🎉");
        push("/auth/onboarding");
      } else {
        toast.success("Check your inbox for a confirmation email.");
        push("/auth/login");
      }
    },
    onError: (error: AuthError) => {
      toast.error(error.message || "Registration failed");
    },
  });

  const loginWithGoogle = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    },
    onError: (error: AuthError) => {
      toast.error(error.message || "Google login failed");
    },
  });

  const forgotPassword = useMutation({
    mutationFn: async ({ email }: ForgotPasswordSchema) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Password reset email sent. Check your inbox.");
    },
    onError: (error: AuthError) => {
      toast.error(error.message || "Failed to send reset email");
    },
  });

  const resetPassword = useMutation({
    mutationFn: async ({ password }: ResetPasswordSchema) => {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Password updated! You can now login with your new password.");
      push("/auth/login");
    },
    onError: (error: AuthError) => {
      toast.error(error.message || "Failed to reset password");
    },
  });

  const completeOnboarding = useMutation({
    mutationFn: async ({ role, language, dob, studentRollNo }: OnboardingSchema) => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error("User not logged in");

      const payload = {
        id: user.id,
        class_level: "unassigned",
        role,
        date_of_birth: dob || null,
        language_preference: language,
        metadata: role === "parent" ? { student_roll_no: studentRollNo } : null,
      } as const;

      const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Onboarding complete");
      push("/dashboard");
    },
    onError: (error: AuthError | Error) => {
      toast.error(("message" in error && error.message) || "Onboarding failed");
    },
  });

  const getUser = useQueryReactQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(supabase),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { loginUser, registerUser, loginWithGoogle, forgotPassword, resetPassword, completeOnboarding, getUser, isPending };
};
