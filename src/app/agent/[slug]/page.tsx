
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send } from "lucide-react";

const subjects: Record<string, string> = {
  poems: "You are a fun poem teacher for kids. Answer queries with rhymes or short verses.",
  counting: "You are a math buddy. Teach counting with examples and fun tricks.",
  alphabet: "You are an alphabet guide. Help kids learn A to Z with sounds.",
  shapes: "You are a shapes teacher. Help kids recognize circles, squares & triangles with fun activities.",
  colors: "You are a colors guide. Teach kids colors using objects and drawing games.",
  stories: "You are a storytelling buddy. Tell short stories with fun lessons and pictures.",
  drawing: "You are an art teacher. Guide kids to draw, color and create fun art.",
  songs: "You are a music buddy. Teach kids songs, rhymes and melodies with fun interaction.",
  games: "You are a games mentor. Introduce educational mini-games that teach concepts while playing.",
};

// Kid-friendly formatted responses
const formattedResponses: Record<string, string> = {
  poems: `🎉 Let's have fun with poems! 🎉
Roses are red, violets are blue,
Learning with me is fun to do! 🌟
💡 Try making your own short rhyme!`,
  counting: `🎉 Okay! Let's learn to count from 1 to 10! 🎉
1️⃣ 1  2️⃣ 2  3️⃣ 3  4️⃣ 4  5️⃣ 5  6️⃣ 6  7️⃣ 7  8️⃣ 8  9️⃣ 9 🔟 10
🍎 Fun Apple Examples: 1 apple 🍎, 2 apples 🍎🍎, 3 apples 🍎🍎🍎
🎵 Fun Counting Tricks: Count on fingers, Clap, Use toys!`,
  alphabet: `🔤 Let's learn the alphabet! 🔤
A for Apple 🍎, B for Ball ⚽, C for Cat 🐱, D for Dog 🐶, E for Elephant 🐘
🎨 Try drawing letters and matching objects!`,
  shapes: `🔺 Let's learn shapes! 🔺
⭕ Circle, ◼ Square, 🔺 Triangle, ⬛ Rectangle
💡 Try finding these shapes around your room!`,
  colors: `🎨 Let's learn colors! 🎨
🔴 Red, 🔵 Blue, 🟢 Green, 🟡 Yellow, 🟣 Purple
💡 Try coloring objects around you with these colors!`,
  stories: `📖 Story Time! 📖
Once upon a time, there was a little bunny who loved to explore... 🐇
💡 Ask me to continue the story or create your own!`,
  drawing: `✏️ Let's draw! ✏️
Draw a sun ☀️, a tree 🌳, or your favorite animal 🐶
🎨 Color it with crayons or markers!`,
  songs: `🎵 Sing-along Time! 🎵
Twinkle Twinkle Little Star ✨
🎶 Hum along and clap your hands!`,
  games: `🕹️ Let's play games! 🕹️
Try counting blocks, matching colors, or tracing letters!
🏆 Fun and learning combined!`,
};

interface AgentPageProps {
  params: { slug: string };
}

function AgentPage({ params }: AgentPageProps) {
  const { slug } = params;
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setTyping(true);

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Backend call
      const res = await fetch(`http://localhost:8000/agent/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

   const data = await res.json();
let botText = data.answer || "⚠️ Sorry, I couldn't answer.";

// Optionally: formatted responses for first greeting or static tips
// Only use formatted response if messages are empty (first bot message)
if (!messages.length && formattedResponses[slug]) {
  botText = formattedResponses[slug];
}

const botMessage = { role: "bot", text: botText };
setTimeout(() => {
  setMessages((prev) => [...prev, botMessage]);
  setTyping(false);
}, 1200);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: "⚠️ Error fetching response." }]);
      setTyping(false);
    }

    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 p-6">
      <div className="w-full max-w-2xl bg-yellow-50 border-4 border-brown-600 rounded-2xl shadow-xl relative">
        {/* Left Dots */}
        <div className="absolute -left-4 top-0 h-full flex flex-col justify-around">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-gray-700 shadow-inner"></div>
          ))}
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-purple-700 py-4 border-b-2 border-dashed border-gray-400">
          📓 {slug.charAt(0).toUpperCase() + slug.slice(1)} Agent
        </h1>

        {/* Messages */}
        <div className="h-[60vh] overflow-y-auto p-6 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')] bg-repeat rounded-b-2xl">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-3 rounded-xl max-w-sm ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end ml-auto shadow-md"
                  : "bg-white/80 border border-purple-300 text-gray-800 self-start shadow-md flex items-start gap-2"
              }`}
            >
              {msg.role === "bot" && <Bot className="w-5 h-5 text-purple-600 mt-1" />}
              <span>{msg.text}</span>
            </motion.div>
          ))}
          {typing && (
            <motion.div className="flex items-center gap-2 text-purple-600 animate-pulse">
              <Bot className="w-5 h-5" /> Thinking...
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t-2 border-dashed border-gray-300 flex gap-2 bg-yellow-100 rounded-b-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/70"
            placeholder="✍️ Write your question here..."
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition flex items-center gap-1"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
export default AgentPage



