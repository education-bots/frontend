"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErrorMsg(error.message);
    else setSuccessMsg("Logged in successfully!");

    setLoading(false);
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setErrorMsg(error.message);
  };

  // 👇 Resend confirmation email
  const resendEmail = async (email: string) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) setErrorMsg(error.message);
    else setSuccessMsg("Confirmation email resent! Please check your inbox.");

    setLoading(false);
  };

  // 👇 Forgot password
  const resetPassword = async (email: string) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`, // 👈 redirect after clicking email link
    });

    if (error) setErrorMsg(error.message);
    else setSuccessMsg("Password reset email sent! Check your inbox.");

    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="Password" required />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>

          {errorMsg && <p className="mt-3 text-center text-sm text-red-600">{errorMsg}</p>}
          {successMsg && <p className="mt-3 text-center text-sm text-green-600">{successMsg}</p>}

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={loginWithGoogle}
          >
            <FcGoogle size={20} /> Continue with Google
          </Button>

          {/* Resend email + Forgot password */}
          <div className="mt-4 text-center text-sm text-gray-600 space-y-2">
            <p>
              Didn’t get the confirmation email?{" "}
              <button
                type="button"
                className="text-indigo-600 hover:underline"
                onClick={() => {
                  const emailInput = document.querySelector<HTMLInputElement>('input[name="email"]');
                  if (emailInput?.value) resendEmail(emailInput.value);
                  else setErrorMsg("Please enter your email above first.");
                }}
              >
                Resend
              </button>
            </p>
            <p>
              Forgot your password?{" "}
              <button
                type="button"
                className="text-indigo-600 hover:underline"
                onClick={() => {
                  const emailInput = document.querySelector<HTMLInputElement>('input[name="email"]');
                  if (emailInput?.value) resetPassword(emailInput.value);
                  else setErrorMsg("Please enter your email above first.");
                }}
              >
                Reset it
              </button>
            </p>
          </div>

          {/* Link to Register */}
          <div className="mt-2 text-center text-sm text-gray-600">
            <p>
              Don’t have an account?{" "}
              <Link href="/auth/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
