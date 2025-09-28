"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (!data.user) throw new Error("User not found");

      // check if user profile has role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (!profile?.role) {
        router.push("/auth/onboarding");
      } else {
        toast.success("Welcome back 🎉");
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Google login failed";
      toast.error(message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Login to your account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input name="email" type="email" placeholder="Email" required />
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="h-11 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute inset-y-0 top-1 right-0 px-3 text-gray-600 hover:text-gray-900"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-indigo-600 text-white rounded-xl"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>

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
            <Image src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google Icon" width={22} height={22} />
            Continue with Google
          </Button>

          <div className="mt-2 text-center text-sm text-gray-600">
            <p>
              Don’t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-indigo-600 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
