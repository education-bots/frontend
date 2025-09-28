"use client";

import { motion } from "framer-motion";

function ComingSoonBanner() {
  return (
    <div className="w-full flex justify-center items-center bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 px-4 sm:px-6 py-[100px]">
      <motion.div
        animate={{
          background: [
            "linear-gradient(135deg, #ec4899, #f97316)",
            "linear-gradient(135deg, #3b82f6, #22c55e)",
            "linear-gradient(135deg, #a855f7, #06b6d4)",
            "linear-gradient(135deg, #facc15, #ef4444)",
          ],
          scale: [0.98, 1.05, 0.98],
          boxShadow: [
            "0 0 25px rgba(236, 72, 153, 0.5)",
            "0 0 30px rgba(59, 130, 246, 0.5)",
            "0 0 35px rgba(34, 197, 94, 0.5)",
            "0 0 30px rgba(250, 204, 21, 0.5)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="rounded-3xl p-2 md:p-3 w-[95%] md:w-[75%] max-w-2xl"
      >
        <div className="rounded-3xl px-8 py-14 flex flex-col items-center text-center bg-opacity-70 backdrop-blur-lg">
          <motion.h2
            animate={{
              color: ["#fff", "#000", "#fff", "#111"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-3xl md:text-5xl font-extrabold drop-shadow-lg flex items-center gap-3"
          >
            <span role="img" aria-label="mobile">📲</span> 
            Mobile App Coming Soon  
            <span role="img" aria-label="snow">☃️</span>
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
            className="mt-6 text-lg md:text-xl font-medium drop-shadow max-w-lg"
          >
            Experience <span className="font-bold">KiddoLearn</span> anywhere, anytime — stay tuned!
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default ComingSoonBanner;
