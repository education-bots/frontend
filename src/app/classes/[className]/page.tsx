"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Msg = { role: "user" | "assistant"; text: string };

export default function ClassPage() {
  const { className } = useParams();
  const decodedClassName = decodeURIComponent(className as string);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // ✅ Chat logic (unchanged)
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const resp = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          className: decodedClassName,
          subject: selectedSubject,
        }),
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 px-4 sm:px-6 py-[150px]">
      

      <p className="text-center text-gray-600 mb-6">
        Welcome to <span className="font-semibold">{decodedClassName}</span> – Choose a subject to begin!
      </p>

      {/* Subject selector */}
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
  {["English", "Urdu", "Maths", "General Knowledge"].map((subj) => (
    <button
      key={subj}
      onClick={() => setSelectedSubject(subj)}
      className={`relative py-4 px-6 rounded-2xl shadow-md font-semibold text-white transition 
        ${subj === "English" ? "bg-blue-500 hover:bg-blue-600" : ""}
        ${subj === "Urdu" ? "bg-green-500 hover:bg-green-600" : ""}
        ${subj === "Maths" ? "bg-purple-500 hover:bg-purple-600" : ""}
        ${subj === "General Knowledge" ? "bg-pink-500 hover:bg-pink-600" : ""}
        ${selectedSubject === subj ? "ring-4 ring-offset-2 ring-purple-400" : ""}`}
    >
      {subj}
      {selectedSubject === subj && (
        <div className="absolute top-2 right-2 text-white">✨</div>
      )}
    </button>
        ))}
      </div>

      {/* AI Teacher Chat */}
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6">
  <div className="flex items-center gap-2 mb-3">
    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
    <h2 className="text-lg font-bold text-gray-800">
      {selectedSubject ? `${selectedSubject} Teacher` : "AI Teacher Online"} 👩‍🏫
    </h2>
  </div>


        {/* Chat messages */}
        <div className="h-60 border rounded-2xl p-4 mb-4 overflow-y-auto text-sm bg-white items-center justify-center text-center">
           <div className="text-4xl mb-2">💭</div>
          {messages.length === 0 ? (
            
            <p className="text-gray-400">Start learning by asking questions!</p>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl mb-2 ${
                    m.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat input */}
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border-2 border-gray-200 rounded-2xl py-3 px-4 focus:border-purple-400 focus:outline-none"
            placeholder={
              !selectedSubject
                ? "Select a subject first..."
                : `Ask about ${selectedSubject} in ${decodedClassName}...`
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            disabled={!selectedSubject}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || !selectedSubject}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50"
          >
            Send ✨
          </button>
        </div>
      </div>
    </div>
  );
}
