/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      if (data?.session) {
        toast.success("Welcome! Let’s complete your profile 🎉");
        router.push("/auth/onboarding");
      } else {
        toast.success(`Check your inbox ✉️ - confirmation email sent to ${email}.`);
        router.push("/auth/login");
      }

      form.reset();
    } catch (err: any) {
      toast.error(`Registration failed: ${err.message}`);
    }

    setLoading(false);
  };

  const signUpWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(`Google login failed: ${err.message}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 px-4">
      <Card className="w-full max-w-md shadow-xl border rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Create your account
          </CardTitle>
          <p className="text-sm text-gray-500">Start your learning journey with AI Learning School</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 font-medium"
            onClick={signUpWithGoogle}
          >
            <FcGoogle size={22} /> Sign up with Google
          </Button>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300" />
            <span className="px-3 text-xs text-gray-400 uppercase bg-white">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input name="email" type="email" placeholder="Enter your email" className="h-11" required />
            <Input name="password" type="password" placeholder="Create a password" className="h-11" required />
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-medium shadow hover:opacity-90 rounded-xl"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-indigo-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
