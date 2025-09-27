"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/90 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left side: Logo + Title + Paragraph */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/school1.webp"
              alt="School Logo"
              width={60}
              height={60}
              className="rounded-md"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                AI Learning School
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                Choose your class and start your learning adventure!
              </p>
            </div>
          </div>

          {/* Right side: Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-pink-500 font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-pink-500 font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-pink-500 font-medium"
            >
              Attendance
            </Link>
              <Link
              href="/quiz"
              className="text-gray-700 hover:text-pink-500 font-medium"
            >
              Quiz
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
