"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";
import Robot from "@/components/Robot";

const images = [
  "/images/myone.jpg",
  "/images/my6.jpg",
  "/images/my5.jpg",
  "/images/my2.jpg",
  "/images/my3.jpg",
  "/images/my4.jpg",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const splineRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fullscreen Spline Background moved down */}
      <div
        className="absolute top-20 left-0 w-full h-screen z-0"
        style={{ pointerEvents: "none" }} // optional: so Spline doesn't block clicks
      >
        <Spline
          scene="https://prod.spline.design/4vdFX7zRpoEjgwDr/scene.splinecode"
          className="w-full h-full"
          onLoad={(app) => {
            splineRef.current = app;
            if (typeof app.play === "function") {
              try {
                app.play();
              } catch (e) {}
            }
          }}
        />
      </div>

      {/* Content Over Spline stays in the same place */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12">
        <motion.div
          className="w-full lg:w-1/3 flex items-center justify-center p-6 lg:p-12 translate-x-[-40px] translate-y-[30px]"
          initial={{ opacity: 0, x: -150, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 40 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Robot />
        </motion.div>

        {/* Right Rotating Images */}
        <div className="hidden md:block lg:w-1/3 relative items-center justify-center overflow-visible h-56 lg:h-[400px] pt-2 lg:pt-15">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.8 }}
              className="absolute w-[70%] h-[90%] right-0"
              style={{ transform: "translateX(35%)" }}
            >
              <Image
                src={images[index]}
                alt={`Slide ${index}`}
                fill
                priority
                className="object-cover rounded-xl shadow-xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
