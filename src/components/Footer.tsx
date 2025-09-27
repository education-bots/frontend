"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 text-gray-800 rounded-t-[2.5rem] shadow-xl overflow-hidden relative">
      {/* Decorative bubbles */}
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-pink-400 opacity-40 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-400 opacity-40 rounded-full blur-2xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
        {/* Logo */}
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-extrabold text-pink-700 drop-shadow-md">
            KiddoLearn
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            🌈 Fun, safe & interactive learning for curious kids.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-purple-700 mb-3">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-pink-600">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-pink-600">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-pink-600">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-purple-700 mb-3">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <Link href="https://facebook.com" className="p-3 bg-white rounded-full shadow-md hover:scale-110">
              <Facebook size={20} className="text-blue-600" />
            </Link>
            <Link href="https://twitter.com" className="p-3 bg-white rounded-full shadow-md hover:scale-110">
              <Twitter size={20} className="text-sky-500" />
            </Link>
            <Link href="https://instagram.com" className="p-3 bg-white rounded-full shadow-md hover:scale-110">
              <Instagram size={20} className="text-pink-500" />
            </Link>
            <Link href="https://youtube.com" className="p-3 bg-white rounded-full shadow-md hover:scale-110">
              <Youtube size={20} className="text-red-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative bg-white/80 text-center py-4 text-sm text-gray-700 rounded-b-[2.5rem]">
        © {new Date().getFullYear()}{" "}
        <span className="font-bold text-pink-700">KiddoLearn</span>{" "}
        <span className="font-bold text-emerald-700">Asia Parveen</span>. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
