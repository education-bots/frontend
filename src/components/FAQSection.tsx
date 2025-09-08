
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Sparkles, BookOpen, Baby, Star } from "lucide-react";

type Faq = {
  q: string;
  a: string;
};

function FAQSection() {
  const [faqs, setFaqs] = useState<Faq[]>([
    { q: "🌟 What makes KiddoLearn special?", a: "KiddoLearn uses Agentic AI to make learning fun and safe for kids." },
    { q: "🎨 Is the app safe for kids?", a: "Yes! No ads, no unsafe content — just playful, colorful lessons." },
  ]);

  const [newQuestion, setNewQuestion] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Backend integration
  const handleAddQuestion = async () => {
    if (newQuestion.trim() === "") return;
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: newQuestion }),
      });

      const data = await res.json();
      const newFaq: Faq = {
        q: newQuestion,
        a: data.answer || "⚠️ No response from agent.",
      };

      setFaqs([...faqs, newFaq]);
      setNewQuestion("");
    } catch (error) {
      console.error("Error:", error);
      const fallbackFaq: Faq = {
        q: newQuestion,
        a: "⚠️ Something went wrong. Please try again.",
      };
      setFaqs([...faqs, fallbackFaq]);
    }
    setLoading(false);
  };

  return (
<section className="relative w-full px-4 py-20 bg-gradient-to-r from-yellow-100 to-pink-100 overflow-hidden">
  {/* Decorative background */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 opacity-80 blur-2xl"></div>

  {/* Heading */}
  <div className="text-center mb-12">
    <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg flex items-center justify-center gap-2">
      <Sparkles className="text-yellow-400 w-8 h-8 animate-bounce" />
      KiddoLearn FAQ
      <Sparkles className="text-pink-400 w-8 h-8 animate-bounce" />
    </h2>
    <p className="mt-4 text-gray-700 text-lg md:text-xl flex justify-center gap-2 items-center">
      <Baby className="text-pink-400 w-6 h-6" /> 
      🌈 Curious kids ask, and our AI friend answers! 
      <BookOpen className="text-blue-500 w-6 h-6" />
    </p>
  </div>

      {/* Add Question */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row items-center gap-3 mb-10 bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 p-5 rounded-3xl shadow-xl border-2 border-pink-300"
      >
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="💭 Ask your question here..."
          className="flex-1 px-4 py-3 rounded-2xl border-2 border-pink-300 focus:ring-4 focus:ring-pink-400 outline-none text-gray-800 shadow-sm"
        />
        <button
          onClick={handleAddQuestion}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold shadow-lg hover:scale-95 transition disabled:opacity-50"
        >
          <PlusCircle className="w-6 h-6" />
          {loading ? "Thinking..." : "Ask"}
        </button>
      </motion.div>

      {/* FAQ List */}
      <div className="space-y-6">
        {faqs.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl shadow-xl bg-gradient-to-br from-white via-pink-50 to-blue-50 border border-pink-200 overflow-hidden hover:shadow-2xl transition"
          >
            {/* Question */}
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center px-6 py-5 text-left bg-gradient-to-r from-pink-100 to-blue-100 hover:from-yellow-100 hover:to-pink-200 transition"
            >
              <span className="font-bold text-lg md:text-xl text-gray-800 flex items-center gap-2">
                <Star className="text-yellow-400 w-5 h-5 animate-spin-slow" />
                {item.q}
              </span>
              <span className="text-3xl font-bold text-pink-500">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="px-6 pb-5 text-gray-700 text-base md:text-lg leading-relaxed bg-white/80"
                >
                  ✨ {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
