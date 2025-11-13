"use client";

import { useState } from "react";
import useSupabaseBrowser from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ForgotPasswordPage() {

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const supabase = useSupabaseBrowser();


  const handleForgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset`,
    });

    if (error) setErrorMsg(error.message);
    else setSuccessMsg("Password reset email sent. Check your inbox.");

    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgot} className="space-y-4">
            <Input name="email" type="email" placeholder="Email" required />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Send Reset Link"}
            </Button>
          </form>

          {errorMsg && <p className="mt-3 text-center text-sm text-red-600">{errorMsg}</p>}
          {successMsg && <p className="mt-3 text-center text-sm text-green-600">{successMsg}</p>}

          <div className="mt-4 text-center text-sm text-gray-600">
            <Link href="/auth/login" className="text-indigo-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
