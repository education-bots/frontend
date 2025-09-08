"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRouter } from "next/navigation"; // ✅ App Router

type Msg = { role: "user" | "assistant"; text: string };

export default function SchoolUI() {
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // ✅ Only one handleClassSelect
  const handleClassSelect = (className: string) => {
    setSelectedClass(className);

    const welcomeMsg: Msg = {
      role: "assistant",
      text: `Welcome to ${className}! I'm your AI teacher. What would you like to learn today? 🌟`,
    };
    setMessages([welcomeMsg]);

    // Navigate to dynamic route
    router.push(`/classes/${encodeURIComponent(className)}`);
  };

  // ✅ Only one sendMessage
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const resp = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await resp.json();
      const assistantMsg: Msg = {
        role: "assistant",
        text: data.reply ?? "No response",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Error contacting the agent." },
      ]);
    }
  };

  // English classes
  const englishClasses = [
    { name: "KG", color: "bg-pink-500", hoverColor: "hover:bg-pink-600" },
    { name: "Class 1", color: "bg-yellow-500", hoverColor: "hover:bg-yellow-600" },
    { name: "Class 2", color: "bg-green-500", hoverColor: "hover:bg-green-600" },
    { name: "Class 3", color: "bg-blue-500", hoverColor: "hover:bg-blue-600" },
    { name: "Class 4", color: "bg-purple-500", hoverColor: "hover:bg-purple-600" },
  ];

  const urduClasses = [
    { name: "کےجی", color: "bg-pink-500", hoverColor: "hover:bg-pink-600" },
    { name: "کلاس ۱", color: "bg-purple-500", hoverColor: "hover:bg-purple-600" },
    { name: "کلاس ۲", color: "bg-teal-500", hoverColor: "hover:bg-teal-600" },
    { name: "کلاس ۳", color: "bg-red-500", hoverColor: "hover:bg-red-600" },
    { name: "کلاس ۴", color: "bg-indigo-500", hoverColor: "hover:bg-indigo-600" },
  ];

  const slides = [
    { src: "/images/my2.jpg", alt: "Shapes" },
    { src: "/images/my3.jpg", alt: "Vowels" },
    { src: "/images/my4.jpg", alt: "Fruits" },
    { src: "/images/my5.jpg", alt: "Wild Animals" },
  ];

  return (
  <div className="relative min-h-screen flex flex-col items-center px-4 sm:px-6 py-[80px]">

      {/* Background */}
      <Image
        src="/images/home3.jpg"
        alt="School Background"
        fill
        className="object-cover -z-10"
      />

      {/* 🚫 Removed Title Card block here */}

      {/* English - Slider - Urdu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-10 items-start">
        {/* English */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-left text-blue-700">
            📘 English Syllabus
          </h2>
          {englishClasses.map((cls, idx) => (
            <button
              key={idx}
              onClick={() => handleClassSelect(cls.name)}
              className={`
                relative
                ${cls.color} ${cls.hoverColor}
                text-white font-bold py-4 px-6 rounded-2xl shadow-lg
                hover:scale-105 hover:shadow-xl transition
                ${
                  selectedClass === cls.name
                    ? "ring-4 ring-white ring-opacity-60"
                    : ""
                }
              `}
            >
              {cls.name}
              {selectedClass === cls.name && (
                <div className="absolute top-2 left-2 text-xl">✨</div>
              )}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="w-full mt-16">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="rounded-2xl shadow-lg"
          >
            {slides.map((s, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-56 sm:h-64 md:h-72">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Urdu */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-right mr-4 text-green-700">
            📗 اردو نصاب
          </h2>
          {urduClasses.map((cls, idx) => (
            <button
              key={idx}
              onClick={() => handleClassSelect(cls.name)}
              className={`
                relative
                ${cls.color} ${cls.hoverColor}
                text-white font-bold py-4 px-6 rounded-2xl shadow-lg
                hover:scale-105 hover:shadow-xl transition
                ${
                  selectedClass === cls.name
                    ? "ring-4 ring-white ring-opacity-60"
                    : ""
                }
              `}
            >
              {cls.name}
              {selectedClass === cls.name && (
                <div className="absolute top-2 right-2 text-xl">✨</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-4 sm:p-6 border border-white/20">
        {/* chat header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-semibold text-gray-700">
              {selectedClass ? `${selectedClass} Teacher` : "AI Teacher"} Online
            </span>
          </div>
          <div className="text-sm text-gray-500">{messages.length} messages</div>
        </div>

        {/* chat body */}
        <div className="h-64 sm:h-80 overflow-y-auto border border-gray-100 rounded-2xl p-4 mb-4 bg-gradient-to-b from-gray-50 to-white space-y-3">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-center">
              <div>
                <div className="text-4xl mb-2">💭</div>
                <p>Start a conversation with your AI Agent!</p>
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
              >
                <div
                  className={`
                    max-w-[80%] p-3 rounded-2xl shadow-sm
                    ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto"
                        : "bg-gradient-to-r from-green-500 to-green-600 text-white mr-auto"
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold opacity-90">
                      {m.role === "user" ? "You" : "An Agent"}
                    </span>
                    <span className="text-xs opacity-70">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* chat input */}
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border-2 border-gray-200 rounded-2xl py-3 px-4 focus:border-purple-400 focus:outline-none"
            placeholder="Ask me anything..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50"
          >
            Send ✨
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Powered by AI • Made with 💖 for young learners</p>
      </div>
    </div>
  );
}
