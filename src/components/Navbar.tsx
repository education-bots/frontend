"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSupabaseBrowser from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {

  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = useSupabaseBrowser();

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
    <nav className="w-full bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 shadow-md fixed top-0 left-0 z-50">
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
              AICompanion
            </h1>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-semibold text-purple-800 hover:text-pink-600">
              Home
            </Link>

            {user ? (
              <>
                <Link href="/dashboard" className="font-semibold text-purple-800 hover:text-pink-600">
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-purple-800 hover:text-pink-600"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="font-semibold text-purple-800 hover:text-pink-600">
                  Login
                </Link>
                <Link href="/auth/register" className="font-semibold text-purple-800 hover:text-pink-600">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-purple-800 hover:text-pink-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 shadow-md px-6 py-4 space-y-4">
          {/* ✅ Added p tag under headings */}
          <p className="mt-2 text-sm sm:text-base text-gray-700">
            Click{" "}
            <Link
              href="/auth/register"
              className="underline font-semibold text-blue-800 hover:text-pink-700"
            >
              Register
            </Link>{" "}
            to fill your admission form
          </p>

          <Link
            href="/"
            className="block font-semibold text-purple-800 hover:text-pink-600"
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                href="/chat"
                className="block font-semibold text-purple-800 hover:text-pink-600"
              >
                Chat
              </Link>
              <Link
                href="/dashboard"
                className="block font-semibold text-purple-800 hover:text-pink-600"
              >
                Dashboard
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="w-full text-purple-800 hover:text-pink-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="block font-semibold text-purple-800 hover:text-pink-600"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="block font-semibold text-purple-800 hover:text-pink-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}


      {/* 🎯 Centered Heading over Hero */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50 px-4">
        <h1 className="text-xl sm:text-2xl md:text-2xl font-extrabold bg-gradient-to-r from-pink-700 via-purple-700 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to AICompanion
        </h1>
        {user ? null : (
          <p className="mt-2 text-sm sm:text-base text-gray-700">
            Click{" "}
            <Link
              href="/auth/register"
              className="underline font-semibold text-blue-800 hover:text-pink-700"
            >
              Register
            </Link>{" "}
            to fill your admission form
          </p>
        )}
      </div>
    </nav>
  );
}
