"use client";

import { useEffect } from "react";
import useSupabaseBrowser from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CallbackPage() {
  const router = useRouter();
  const supabase = useSupabaseBrowser();

  useEffect(() => {
    const checkProfile = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        toast.error("Authentication failed. Please try again.");
        router.push("/auth/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError && profileError.code === "PGRST116") {
        // insert safe defaults if no row
        await supabase.from("profiles").insert([
          {
            id: user.id,
            class_level: "unassigned",
            role: undefined,
            language_preference: "Urdu",
          },
        ]);
      }

      if (!profile?.role) {
        router.push("/auth/onboarding");
      } else {
        router.push("/dashboard");
      }
    };

    checkProfile();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg text-gray-600">Loading your account...</p>
    </div>
  );
}
