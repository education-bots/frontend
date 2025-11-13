import { TypedSupabaseClient } from "@/lib/supabase/client";

export async function getConversations(supabase: TypedSupabaseClient) {
  const { data, error } = await supabase
    .from("conversations")
    .select()
    .order("started_at")
    .throwOnError();

  if (!data || error) {
    console.error("Error fetching conversations", error);
    throw new Error("Error fetching conversations");
  }
  return data;
}

export async function getChatHistory(supabase: TypedSupabaseClient, conversationId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select()
    .eq("conversation_id", conversationId)
    .order("created_at")
    .throwOnError();

  if (!data || error) {
    console.error("Error fetching conversations", error);
    throw new Error("Error fetching conversations");
  }
  return data;
}


import axios from "axios";
import { ChatMessage, messageSchema } from "./schema";

export interface SendMessagePayload {
  user_id: string;
  question: string;
  conversation_id: string;
  user: {
    user_id: string;
    name: string;
    class_level: string;
    language: string;
    age: number;
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/v1",
});

api.interceptors.request.use((config) => {
  const clientKey = process.env.NEXT_PUBLIC_FRONTEND_AUTH_SECRET;
  if (clientKey) config.headers["edu-api-client"] = clientKey;
  return config;
});

export type StreamChunk = {
  chunk: string;
  conversation_id: string;
  is_final: boolean;
};

export type StreamCallback = (chunk: StreamChunk) => void;

export async function sendMessage(
  payload: SendMessagePayload,
  onChunk?: StreamCallback
): Promise<ChatMessage> {
  if (!onChunk) {
    // If no streaming callback provided, use regular axios request
    const { data } = await api.post(`/agents/ask`, payload);
    return messageSchema.parse(data);
  }

  const clientKey = process.env.NEXT_PUBLIC_FRONTEND_AUTH_SECRET;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/v1"}/agents/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(clientKey ? { 'edu-api-client': clientKey } : {})
    },
    body: JSON.stringify(payload)
  });

  if (!response.body) {
    throw new Error('No response body received');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let finalMessage: ChatMessage | null = null;

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      try {
        const data: StreamChunk = JSON.parse(chunk);
        onChunk(data);

        if (data.is_final) {
          finalMessage = messageSchema.parse(data);
        }
      } catch (e) {
        console.error('Error parsing chunk:', e);
      }
    }
  } finally {
    reader.releaseLock();
  }

  if (!finalMessage) {
    throw new Error('No final message received');
  }

  return finalMessage;
}
