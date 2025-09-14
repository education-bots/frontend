/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/components/ui/use-toast";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const form = e.currentTarget; // store reference

  const formData = new FormData(form);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // no emailRedirectTo here
    });

    console.log(data, error);
    if (error) throw error;

    toast({
      title: "Check your inbox ✉️",
      description: `A confirmation email was sent to ${email}. Please verify your account.`,
    });

    form.reset();
  } catch (err: any) {
    toast({
      variant: "destructive",
      title: "Registration failed",
      description: err.message,
    });
  }

  setLoading(false);
};



  const signUpWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
      if (error) throw error;
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: err.message,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Create your account
          </CardTitle>
          <p className="text-sm text-gray-500">
            Start your learning journey with AI Learning School
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google Sign Up */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 font-medium"
            onClick={signUpWithGoogle}
          >
            <FcGoogle size={22} /> Sign up with Google
          </Button>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300" />
            <span className="px-3 text-xs text-gray-400 uppercase bg-white">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          {/* Email + Password Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="h-11"
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Create a password"
              className="h-11"
              required
            />
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-medium shadow hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-indigo-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
