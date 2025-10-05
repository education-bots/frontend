"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatHistory, getConversations, sendMessage, SendMessagePayload, StreamChunk } from "./queries";
import type { ChatMessage, SendMessageInput } from "./schema";
import useSupabaseBrowser from "@/lib/supabase/client";
import { useUserProfile } from "../profile/hooks";
import { calculateAge } from "@/lib/utils";
import { useCallback, useState } from "react";

export const useConversations = () => {
  const supabase = useSupabaseBrowser();
  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversations(supabase),
    staleTime: 1000 * 60 * 2,
  });
};

export const useChat = (conversationId: string) => {

  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();
  const { data: userProfile, isFetching } = useUserProfile();

  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');


  if (!isFetching && !userProfile?.id) {
    console.log(userProfile)
    // return;
    throw new Error("Error fetching user profile");
  }

  if (isFetching) {
    console.log("still fetching")
  }

  const historyQuery = useQuery({
    queryKey: ["chat", conversationId],
    queryFn: () => getChatHistory(supabase, conversationId),
    enabled: Boolean(conversationId),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const age = userProfile.date_of_birth ? calculateAge(userProfile.date_of_birth) : 8

  const sendStreamingMessage = useCallback(async (
    payload: SendMessageInput,
    onComplete?: (message: ChatMessage) => void
  ) => {
    setIsStreaming(true);
    setStreamingMessage('');

    try {
      const finalMessage = await sendMessage(
        {
          user_id: userProfile.id,
          question: payload.question,
          conversation_id: payload.conversation_id,
          user: {
            user_id: userProfile.id,
            name: userProfile.full_name || 'User',
            class_level: userProfile.class_level,
            language: userProfile.language_preference || 'English',
            age: age,
          }
        },
        (chunk: StreamChunk) => {
          if (!chunk.is_final) {
            setStreamingMessage(prev => prev + chunk.chunk);
          }
        });

      onComplete?.(finalMessage);
      setStreamingMessage('');
    } catch (error) {
      console.error('Error in streaming chat:', error);
      throw error;
    } finally {
      setIsStreaming(false);
    }
  }, []);


  const send = useMutation({
    // mutationFn: (payload: SendMessageInput) => sendMessage({
    //   user_id: userProfile.id,
    //   question: payload.question,
    //   conversation_id: payload.conversation_id,
    //   user: {
    //     user_id: userProfile.id,
    //     name: userProfile.full_name || 'User',
    //     class_level: userProfile.class_level,
    //     language: userProfile.language_preference || 'English',
    //     age: age,
    //   }
    // }),

    mutationFn: (payload) => sendStreamingMessage(payload),

    onMutate: async ({ question }: SendMessageInput) => {
      const key = ["chat", conversationId];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<ChatMessage[]>(key) || [];

      const optimistic: ChatMessage = {
        conversation_id: conversationId,
        role: "user",
        text: question,
      };

      queryClient.setQueryData<ChatMessage[]>(key, [...previous, optimistic]);
      return { previous };
    },

    onSuccess: (msg) => {
      const key = ["chat", conversationId];
      const previous = queryClient.getQueryData<ChatMessage[]>(key) || [];
      const optimistic: ChatMessage = {
        conversation_id: conversationId,
        role: "assistant",
        text: streamingMessage,
      };
      queryClient.setQueryData<ChatMessage[]>(key, [...previous, optimistic]);
    },

    onError: (_err, _vars, context) => {
      const key = ["chat", conversationId];
      if (context?.previous) queryClient.setQueryData(key, context.previous);
    },
  });


  return {
    history: historyQuery.data || [],
    isLoading: historyQuery.isLoading,
    refetch: historyQuery.refetch,
    sendMessage: (input: SendMessageInput) => send.mutateAsync(input),
    isSending: send.isPending,
  };
};
