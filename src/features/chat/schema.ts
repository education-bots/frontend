import { z } from "zod";

export const conversationSchema = z.object({
  id: z.string(),
  title: z.string().default("Untitled"),
  started_at: z.string().optional(),
});

export type Conversation = z.infer<typeof conversationSchema>;

export const messageSchema = z.object({
  id: z.string().optional(),
  conversation_id: z.string(),
  role: z.enum(["user", "assistant"]),
  text: z.string(),
  created_at: z.string().optional(),
});

export type ChatMessage = z.infer<typeof messageSchema>;

export const sendMessageSchema = z.object({
  conversation_id: z.string(),
  question: z.string().min(1, { message: "Message cannot be empty" }),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
