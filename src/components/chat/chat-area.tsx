"use client";

import { LoaderPinwheelIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FormEvent, useEffect, useState } from "react";
import { useChat } from "@/features/chat/hooks";
import { useStreamingChat } from "@/features/chat/hooks/useStreamingChat";
import Image from "next/image";


const dummy = [
  { role: 'user', text: "abc" },
  { role: 'assistant', text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam unde provident voluptate itaque voluptates dolorum delectus commodi quod perferendis est doloremque, quia illo cum." },
  { role: 'user', text: "abc" },
  { role: 'assistant', text: "abc" },
  { role: 'user', text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam unde provident voluptate itaque voluptates dolorum delectus commodi quod perferendis est doloremque, quia illo cum." },
  { role: 'assistant', text: "abc" },
  { role: 'user', text: "abc" },
  { role: 'assistant', text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam unde provident voluptate itaque voluptates dolorum delectus commodi quod perferendis est doloremque, quia illo cum." },
  { role: 'user', text: "abc" },
]

export const ChatArea = ({ conversationId }: { conversationId: string }) => {
  const { history: messages, isSending } = useChat(conversationId);
  const { streamingMessage, isStreaming, sendStreamingMessage } = useStreamingChat();
  const [input, setInput] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // reset any transient UI when conversation changes
    setInput("");
  }, [conversationId]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || processing) return;
    const question = input;
    setInput("");
    setProcessing(true);
    try {
      // Include the necessary user data here - you might want to get this from a context or props
      await sendStreamingMessage({
        conversation_id: conversationId,
        question,
        user_id: "user_id", // Replace with actual user ID
        user: {
          user_id: "user_id", // Replace with actual user ID
          name: "User", // Replace with actual user name
          class_level: "grade_8", // Replace with actual class level
          language: "en", // Replace with actual language preference
          age: 13, // Replace with actual age
        }
      });
    } finally {
      setProcessing(false);
    }
  };

  return (<>
    <div className="flex-1 flex flex-col px-6 py-10">
      {/* Chat messages */}
      <div className="relative p-4 pt-14 pb-14 h-[80dvh] overflow-hidden bg-white/90 shadow-xl border rounded-2xl">
        <div className="absolute top-1 w-full flex items-center gap-2 mb-3 bg-white/90 py-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h2 className="text-lg font-bold text-gray-800">
            AI Tutor 👩‍🏫
          </h2>
        </div>

        {/* Conversation */}
        <div className="h-full flex-1 overflow-y-auto px-2">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              <div className="text-4xl mb-2">💭</div>
              <p>Start chatting with your AI Tutor!</p>
            </div>
          ) : (
            messages.map((item, i) => (
              <div
                key={i}
                className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={cn(
                    "max-w-[70%] py-1 px-4 rounded-md mb-2",
                    item.role === "user" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                  )}
                >
                  {item.message_text}
                </div>
              </div>
            ))
          )}

          {isStreaming && streamingMessage && (
            <div className="flex justify-start">
              <div className="max-w-[70%] py-1 px-4 rounded-md mb-2 bg-green-500 text-white">
                {streamingMessage}
                <span className="inline-block animate-pulse">▋</span>
              </div>
            </div>
          )}

          {processing && !streamingMessage ? (
            <div className="flex justify-start">
              <div className="max-w-[70%] py-1 px-4 rounded-2xl mb-2 bg-green-500 text-white">
                <LoaderPinwheelIcon className="animate-spin h-4" />
              </div>
            </div>
          ) : null}

          {/* <div className="flex justify-start">
            <div className="max-w-[70%] py-1 px-4 rounded-2xl mb-2 bg-green-500 text-white">
              {/* <Image src="/loader2.webp" alt="loading" height={90} width={90} />
                {/* <video src="/loader.mp4" autoPlay loop muted width={90} height={90} />
            </div>
          </div> */}
        </div>

        {/* Chat input */}
        <form onSubmit={handleSend} className="absolute bottom-3 w-[calc(100%-2rem)] flex gap-3">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full flex-1 border-2 focus:border-purple-400 focus:outline-none"
            placeholder="Ask me anything..."
          />
          <Button variant="primary" disabled={!input.trim() || processing || isSending}>
            Send ✨
          </Button>
        </form>

      </div>
    </div>
  </>)
}
