"use client";
import { motion } from "framer-motion";

 function LearningCards() {
  const features = [
    {
      title: "Smart Learning",
      desc: "AI ki madad se bacche games aur stories k through seekhen.",
      color: "from-pink-400 to-red-400",
    },
    {
      title: "Fun Activities",
      desc: "Counting, poems aur puzzles se engaging activities.",
      color: "from-green-400 to-emerald-400",
    },
    {
      title: "Creative Growth",
      desc: "Drawing aur rhymes ke sath imagination improve karo.",
      color: "from-blue-400 to-indigo-400",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-100 to-pink-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-purple-700 mb-4"
        >
          🌟 Kindergarten Agentic Education
        </motion.h2>
        <p className="text-lg text-gray-700 mb-12">
          Bachon ke liye AI-powered learning ka naya safar – fun, creative aur engaging!
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`p-6 rounded-2xl shadow-lg text-white bg-gradient-to-r ${feature.color}`}
            >
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default LearningCards