"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/f3.jpg",
  "/images/slide5.jpg",
  "/images/slide3.jpg",
  "/images/f2.jpg",
  "/images/f1.jpg",
  "/images/f6.jpg",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // Auto change image every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
  className="w-full min-h-[calc(100vh-80px)] relative flex flex-col md:flex-row px-4 sm:px-6 py-[80px] mt-[80px] 
  bg-[url('/images/home3.jpg')] bg-cover bg-center bg-no-repeat"
>
      {/* Left Card with Slide-in Animation */}
      <motion.div
        className="w-full md:w-3/5 flex items-center justify-center p-6 md:p-12 relative"
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* 🎀 Light Pink Ball (top-left area) */}
        <motion.div
          className="hidden lg:block absolute left-8 top-10 w-14 h-14 bg-pink-300 rounded-full shadow-lg z-10"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hidden lg:block absolute left-8 top-50 w-14 h-14 bg-purple-600 rounded-full shadow-lg z-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 🌐 Sky Blue Ball (bottom-left area) */}
        <motion.div
          className="hidden lg:block absolute left-8 bottom-12 w-14 h-14 bg-sky-300 rounded-full shadow-lg z-10"
          animate={{ y: [0, -25, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* White Card */}
        <div className="bg-white/90 p-6 md:p-8 rounded-2xl shadow-2xl max-w-md text-center transform hover:rotate-x-3 hover:rotate-y-3 hover:scale-105 transition duration-500">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to our AI School
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Learn from our AI teachers and explore the future of education.
          </p>

          {/* English Admission Button */}
          <Link href="/admission">
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition mb-4">
              🎓 Apply for Admission
            </button>
          </Link>

          {/* Urdu Admission Button */}
          <Link href="/admission">
            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition">
              داخلے جاری 🎓
            </button>
          </Link>
        </div>

        {/* 🎀 Right Side Balls */}
        <motion.div
          className=" hidden lg:block absolute right-8 top-10 w-14 h-14 bg-pink-300 rounded-full shadow-lg z-10"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hidden lg:block absolute right-8 top-50 w-14 h-14 bg-purple-600 rounded-full shadow-lg z-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hidden lg:block absolute right-8 bottom-12 w-14 h-14 bg-sky-300 rounded-full shadow-lg z-10"
          animate={{ y: [0, -25, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      {/* Right Rotating Images */}
      <div className="w-full md:w-2/5 relative flex items-center justify-center overflow-hidden h-64 md:h-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full h-full"
          >
            <Image
              src={images[index]}
              alt={`Slide ${index}`}
              fill
              className="object-cover rounded-xl shadow-xl"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
