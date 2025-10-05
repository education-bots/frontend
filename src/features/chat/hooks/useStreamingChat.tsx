import { useState, useCallback } from 'react';
import { ChatMessage } from '../schema';
import { sendMessage, SendMessagePayload, StreamChunk } from '../queries';

export function useStreamingChat() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');

  const sendStreamingMessage = useCallback(async (
    payload: SendMessagePayload,
    onComplete?: (message: ChatMessage) => void
  ) => {
    setIsStreaming(true);
    setStreamingMessage('');

    try {
      const finalMessage = await sendMessage(payload, (chunk: StreamChunk) => {
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

  return {
    isStreaming,
    streamingMessage,
    sendStreamingMessage
  };
}