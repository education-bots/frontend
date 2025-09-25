"use client";

import {
  LayoutDashboard,
  UserCircle,
  KeyRound,
  BookOpen,
  BarChart2,
  Settings,
  LogOut,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  role: string;
  onLogout: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  role,
  onLogout,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems: Record<
    string,
    { label: string; icon: React.ComponentType<{ size?: number }>; path: string }[]
  > = {
    student: [
      { label: "Profile", icon: UserCircle, path: "/dashboard/profile" },
      { label: "Courses", icon: BookOpen, path: "/dashboard/courses" },
      { label: "Analytics", icon: BarChart2, path: "/dashboard/analytics" },
      { label: "Security", icon: KeyRound, path: "/dashboard/security" },
    ],
    teacher: [
      { label: "Profile", icon: UserCircle, path: "/dashboard/profile" },
      { label: "Students", icon: Users, path: "/dashboard/students" },
      { label: "Courses", icon: BookOpen, path: "/dashboard/courses" },
      { label: "Security", icon: KeyRound, path: "/dashboard/security" },
    ],
    admin: [
      { label: "Profile", icon: UserCircle, path: "/dashboard/profile" },
      { label: "User Management", icon: Users, path: "/dashboard/users" },
      { label: "Analytics", icon: BarChart2, path: "/dashboard/analytics" },
      { label: "Settings", icon: Settings, path: "/dashboard/settings" },
      { label: "Security", icon: KeyRound, path: "/dashboard/security" },
    ],
  };

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white/95 backdrop-blur-md border-r border-gray-200 shadow-lg flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="px-6 py-6 flex items-center justify-between border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            <LayoutDashboard size={20} /> EduBot
          </h1>
        )}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 text-gray-700">
        {menuItems[role].map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.path)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg font-medium transition ${
              pathname === item.path
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-indigo-50"
            }`}
          >
            <item.icon size={18} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100"
        >
          <LogOut size={18} /> {!collapsed && "Logout"}
        </Button>
      </div>
    </aside>
  );
}
