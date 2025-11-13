import { ChatArea } from "@/components/chat/chat-area";
import { Conversations } from "@/components/chat/conversations";

interface Props {
  params: Promise<{ id: string }>
}

export default async function ChatPage({ params }: Props) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex mt-5">
      {/* Sidebar Chat History */}
      <Conversations />

      {/* Main Chat Area */}
      <ChatArea conversationId={id} />
    </div>
  );
}
