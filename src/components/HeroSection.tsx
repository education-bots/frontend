"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background image - no repeat, cover full screen */}
        <div className="absolute inset-0 bg-[url('/images/slide5.jpg')] bg-no-repeat bg-cover bg-center opacity-10" />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <motion.div
          className="flex-1 text-center lg:text-left space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Learning
            </span>{" "}
            with AI
          </h1>
          <p className="text-gray-300 text-lg max-w-lg mx-auto lg:mx-0">
            Personalized learning paths, intelligent insights, and interactive
            tools — built to help students, teachers, and parents achieve more.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 pt-4">
            <motion.button
              className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-600 shadow-lg shadow-yellow-400/30"
              whileHover={{ scale: 1.05 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-6 py-3 rounded-xl border border-gray-500 text-white hover:bg-gray-800/70"
              whileHover={{ scale: 1.05 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Right Visual with Glow & Hover Effect */}
        <motion.div
          className="flex-1 relative w-full h-[350px] lg:h-[500px] group"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glow behind image */}
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/30 via-orange-500/20 to-red-500/30 rounded-2xl blur-3xl opacity-60 group-hover:opacity-80 transition duration-500" />

          {/* Image Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative w-full h-full rounded-2xl shadow-lg shadow-amber-200 overflow-hidden"
          >
            <Image
              src="/images/hero.webp"
              alt="Dashboard Preview"
              fill
              className="object-cover rounded-2xl shadow-lg shadow-orange-500"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
