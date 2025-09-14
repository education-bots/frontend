"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left side: Logo + Title */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/school1.webp"
              alt="School Logo"
              width={60}
              height={60}
              className="rounded-md"
            />
            <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-pink-700 via-purple-700 to-blue-600 bg-clip-text text-transparent drop-shadow-lg flex items-center">
              AI Learning School
            </h1>
          </div>

          {/* Right side: Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="font-bold text-purple-800 hover:text-pink-500"
            >
              Home
            </Link>
            <Link
              href="/admission"
              className="font-bold text-purple-800 hover:text-pink-500"
            >
              Attendence
            </Link>
            <Link
              href="/admission"
              className="font-bold text-purple-800 hover:text-pink-500"
            >
              Admission
            </Link>
          </div>
        </div>
      </div>

      {/* Centered Heading over Hero */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50 px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-700 via-purple-700 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to AI School
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-700">
          Click <Link href="/admission" className="underline font-semibold hover:text-pink-700">Admission</Link> to fill your admission form
        </p>
      </div>
    </nav>
  );
}
