"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import Background3D from "./background3D";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

type Profile = {
  id: string;
  full_name?: string | null;
  role?: string | null;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop collapse
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data);

        // redirect if on /dashboard root
        if (pathname === "/dashboard") {
          if (data.role === "teacher") router.push("/dashboard/students");
          else if (data.role === "admin") router.push("/dashboard/users");
          else router.push("/dashboard/courses");
        }
      }

      setLoading(false);
    };

    fetchProfile();
  }, [router, pathname]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  if (loading) {
    return <p className="text-center mt-20 text-lg font-medium">Loading...</p>;
  }

  const role = profile?.role || "student";

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Background3D />

      <div className="relative z-10 flex h-screen">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex">
          <Sidebar
            role={role}
            onLogout={logout}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Sidebar - Mobile (Drawer) */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar */}
          <div className="relative w-64 h-full bg-white shadow-lg">
            <Sidebar role={role} onLogout={logout} />
          </div>
        </div>

        {/* Main */}
        <main className="flex-1 flex flex-col">
          <Topbar
            role={role}
            name={profile?.full_name}
            onMenuClick={() => setSidebarOpen(true)} // mobile menu
          />
          <div className="flex-1 p-6 overflow-y-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
