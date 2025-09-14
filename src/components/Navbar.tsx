"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  };

  return (
    <nav className="w-full bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo + Title */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/school1.webp"
              alt="School Logo"
              width={50}
              height={50}
              className="rounded-md"
            />
            <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-pink-700 via-purple-700 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
              AI Learning School
            </h1>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-semibold text-gray-700 hover:text-purple-600">
              Home
            </Link>
            <Link href="/about" className="font-semibold text-gray-700 hover:text-purple-600">
              About
            </Link>
            <Link href="/attendance" className="font-semibold text-gray-700 hover:text-purple-600">
              Attendance
            </Link>
            <Link href="/admission" className="font-semibold text-gray-700 hover:text-purple-600">
              Admission
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="font-semibold text-gray-700 hover:text-purple-600">
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-red-600 hover:bg-red-50"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="font-semibold text-gray-700 hover:text-purple-600">
                  Login
                </Link>
                <Link href="/auth/register" className="font-semibold text-gray-700 hover:text-purple-600">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-purple-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 shadow-md px-6 py-4 space-y-4">
          <Link href="/" className="block font-semibold text-gray-700 hover:text-purple-600">
            Home
          </Link>
          <Link href="/about" className="block font-semibold text-gray-700 hover:text-purple-600">
            About
          </Link>
          <Link href="/attendance" className="block font-semibold text-gray-700 hover:text-purple-600">
            Attendance
          </Link>
          <Link href="/admission" className="block font-semibold text-gray-700 hover:text-purple-600">
            Admission
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="block font-semibold text-gray-700 hover:text-purple-600">
                Dashboard
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="w-full text-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block font-semibold text-gray-700 hover:text-purple-600">
                Login
              </Link>
              <Link href="/auth/register" className="block font-semibold text-gray-700 hover:text-purple-600">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
