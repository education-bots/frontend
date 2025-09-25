"use client";

import { Menu } from "lucide-react";

interface TopbarProps {
  role: string;
  name?: string | null;
  onMenuClick?: () => void;
}

export default function Topbar({ role, name, onMenuClick }: TopbarProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
        onClick={onMenuClick}
      >
        <Menu size={22} />
      </button>

      <h2 className="text-lg font-semibold text-gray-800 hidden md:block">
        Welcome, {name || "User"}
      </h2>

      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-sm text-gray-500 capitalize">
          {role}
        </span>
        <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
          {name?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}
