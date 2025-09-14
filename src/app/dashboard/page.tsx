"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  type Profile = {
    id: string;
    name?: string;
    class?: string;
    age?: number;
  };

  const [profile, setProfile] = useState<Profile | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/auth/login"; // redirect if not logged in
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code === "PGRST116") {
        // no profile yet → create one
        await supabase.from("profiles").insert({ id: user.id });
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    getProfile();
  }, []);

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const updates = {
      name: formData.get("name") as string,
      class: formData.get("class") as string,
      age: Number(formData.get("age")),
    };

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user?.id);

    if (error) alert(error.message);
    else setMessage("Profile updated successfully ✅");

    setLoading(false);
  };

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.updateUser({ password });
    if (error) alert(error.message);
    else setMessage("Password updated successfully 🔑");

    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl space-y-6">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={updateProfile} className="space-y-4">
              <Input
                name="name"
                type="text"
                placeholder="Your Name"
                defaultValue={profile?.name || ""}
              />
              <Input
                name="class"
                type="text"
                placeholder="Your Class"
                defaultValue={profile?.class || ""}
              />
              <Input
                name="age"
                type="number"
                placeholder="Your Age"
                defaultValue={profile?.age || ""}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={changePassword} className="space-y-4">
              <Input
                name="password"
                type="password"
                placeholder="New Password"
                required
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Feedback Message */}
        {message && (
          <p className="text-center text-sm text-green-600">{message}</p>
        )}

        {/* Logout */}
        <Button
          variant="outline"
          onClick={logout}
          className="w-full bg-red-50 text-red-600 hover:bg-red-100"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
