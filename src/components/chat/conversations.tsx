"use client";

import Link from "next/link"
import { Button } from "../ui/button"
import { useMemo } from "react";
import { useConversations } from "@/features/chat/hooks";

export const Conversations = () => {
  const { data, isLoading } = useConversations();
  const chatHistory = useMemo(() => data || [], [data]);

  return (<>
    <div className="w-72 h-[80dvh] mt-10 bg-white/80 backdrop-blur-md border-r-2 border-purple-200 p-6 shadow-md rounded-2xl overflow-y-auto">
      <h3 className="text-xl font-bold text-purple-700 mb-4">💬 Chats</h3>
      <Link href="/chat">
        <Button variant="primary">
          + New Chat
        </Button>
      </Link>
      <ul className="space-y-2">
        {isLoading ? (
          <p className="text-gray-400 italic">Loading...</p>
        ) : chatHistory.length === 0 ? (
          <p className="text-gray-400 italic">No chats yet</p>
        ) : (
          chatHistory.map(item => (
            <li key={item.id}>
              <Link
                className="p-3 rounded-xl cursor-pointer transition hover:bg-gray-100"
                href={`/chat/${item.id}`}>
                {item.topic}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  </>)
}
