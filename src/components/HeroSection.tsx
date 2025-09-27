"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-400 via-purple-400 to-blue-600">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/slide5.jpg')] bg-no-repeat bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <motion.div
          className="flex-1 text-center lg:text-left space-y-6 px-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-yellow-200">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-pink-900 via-purple-800 to-blue-800 bg-clip-text text-transparent">
              Learning
            </span>{" "}
            with AI
          </h1>
          <p className="text-white text-lg max-w-lg mx-auto lg:mx-0">
            Personalized learning paths, intelligent insights, and interactive
            tools — built to help students, teachers, and parents achieve more.
          </p>

          {/* Buttons */}
          <div className="flex justify-center lg:justify-start gap-4 pt-4">
            <Link href="/auth/register">
              <motion.button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                whileHover={{ scale: 1.05 }}
              >
                Get Started
              </motion.button>
            </Link>
            <Link href="/chat">
              <motion.button
                className="px-6 py-3 rounded-xl border border-white text-white hover:bg-white hover:text-purple-700 transition"
                whileHover={{ scale: 1.05 }}
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          className="flex-1 relative flex justify-center items-center px-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glow behind image */}
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/30 via-purple-500/20 to-blue-500/30 rounded-2xl blur-3xl opacity-60 group-hover:opacity-80 transition duration-500" />

          {/* Image Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 
                       rounded-2xl shadow-lg shadow-purple-300 overflow-hidden mt-20"
          >
            <Image
              src="/images/hero.webp"
              alt="Dashboard Preview"
              fill
              className="object-cover rounded-2xl shadow-lg shadow-purple-400"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
