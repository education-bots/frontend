"use client";

import { useState } from "react";
import useSupabaseBrowser from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const supabase = useSupabaseBrowser();


  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.updateUser({ password });

    if (error) setErrorMsg(error.message);
    else setSuccessMsg("Password updated! You can now login with your new password.");

    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset} className="space-y-4">
            <Input name="password" type="password" placeholder="New Password" required />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Reset Password"}
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
