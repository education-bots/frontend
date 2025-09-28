"use client";
import { supabase } from "@/lib/supabase/client";
import { getUserData } from "@/lib/supabase/user";
import { useState } from "react";
import { uuidv4 } from "zod";
import { calculateAge } from "@/lib/utils"

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  // Sidebar chat history (persisted in state for now)
  const [chatHistory, setChatHistory] = useState<
    { title: string; messages: Msg[] }[]
  >([]);
  const [currentChat, setCurrentChat] = useState<number | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Msg = { role: "user", text: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");

    try {
      const user = await getUserData(supabase);
      const age = user.user?.date_of_birth ? calculateAge(user.user.date_of_birth) : 12;
      
      console.log("sending request")
      const resp = await fetch("https://my-backend-261417763703.us-central1.run.app/api/v1/agents/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json", "edu-api-client": process.env.NEXT_PUBLIC_FRONTEND_AUTH_SECRET! },
        body: JSON.stringify({
          user_id: user.auth.id,
          conversation_id: String(uuidv4()),
          question: input,
          user: {
            user_id: user.auth.id,
            name: user.user?.full_name || "user",
            class_level: user.user?.class_level || '5',
            language: user.user?.language_preference || "english",
            age: age,
          }
        }),
      });

      const data = await resp.json();
      console.log(data);
      const assistantMsg: Msg = {
        role: "assistant",
        text: data.reply ?? "No response",
      };

      const newMessages = [...updatedMessages, assistantMsg];
      setMessages(newMessages);

      // Update chat history dynamically
      if (currentChat !== null) {
        const historyCopy = [...chatHistory];
        historyCopy[currentChat].messages = newMessages;
        setChatHistory(historyCopy);
      } else {
        setChatHistory([
          ...chatHistory,
          { title: input.slice(0, 15) || "New Chat", messages: newMessages },
        ]);
        setCurrentChat(chatHistory.length);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Error contacting the agent." },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex mt-5">
      {/* Sidebar Chat History */}
      <div className="w-72 h-[80vh] mt-10 bg-white/80 backdrop-blur-md border-r-2 border-purple-200 p-6 shadow-md rounded-2xl overflow-y-auto">
        <h3 className="text-xl font-bold text-purple-700 mb-4">💬 Chats</h3>
        <button
          onClick={() => {
            setMessages([]);
            setCurrentChat(null);
          }}
          className="w-full py-2 px-4 mb-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:scale-105 transition"
        >
          + New Chat
        </button>
        <ul className="space-y-2">
          {chatHistory.length === 0 ? (
            <p className="text-gray-400 italic">No chats yet</p>
          ) : (
            chatHistory.map((chat, i) => (
              <li
                key={i}
                onClick={() => {
                  setMessages(chat.messages);
                  setCurrentChat(i);
                }}
                className={`p-3 rounded-xl cursor-pointer transition ${currentChat === i
                  ? "bg-purple-100 font-semibold"
                  : "hover:bg-gray-100"
                  }`}
              >
                {chat.title}
              </li>
            ))
          )}
        </ul>
      </div>


      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col px-6 py-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h2 className="text-lg font-bold text-gray-800">
            AI Tutor 👩‍🏫
          </h2>
        </div>

        {/* Chat messages */}
        <div className="flex-1 border rounded-2xl p-4 mb-4 overflow-y-auto bg-white/90 shadow-inner">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              <div className="text-4xl mb-2">💭</div>
              <p>Start chatting with your AI Tutor!</p>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl mb-2 ${m.role === "user"
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
    </div>
  );
}
