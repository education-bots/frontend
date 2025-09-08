"use client";

import { motion } from "framer-motion";

function ComingSoonBanner() {
  return (
    <div className="w-full flex justify-center items-center py-10">
      <motion.div
        animate={{
          background: [
            "linear-gradient(135deg, #ec4899, #f97316)",
            "linear-gradient(135deg, #3b82f6, #22c55e)",
            "linear-gradient(135deg, #a855f7, #06b6d4)",
            "linear-gradient(135deg, #facc15, #ef4444)",
          ],
          scale: [0.98, 1.02, 0.98],
          boxShadow: [
            "0 0 20px rgba(236, 72, 153, 0.5)",
            "0 0 25px rgba(59, 130, 246, 0.5)",
            "0 0 30px rgba(34, 197, 94, 0.5)",
            "0 0 25px rgba(250, 204, 21, 0.5)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="rounded-3xl p-1 md:p-2 w-[90%] md:w-[70%] max-w-xl"
      >
        <div className="rounded-3xl px-6 py-10 flex flex-col items-center text-center bg-opacity-70 backdrop-blur-lg">
          <motion.h2
            animate={{
              color: ["#fff", "#000", "#fff", "#111"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-3xl md:text-4xl font-extrabold drop-shadow-lg"
          >
            📲 Mobile App Coming Soon  ☃️
          </motion.h2>
          <motion.p
            animate={{
              color: ["#f1f5f9", "#1e293b", "#f8fafc", "#0f172a"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-4 text-base md:text-lg font-medium drop-shadow"
          >
            Experience KiddoLearn anywhere, anytime — stay tuned!
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default ComingSoonBanner

