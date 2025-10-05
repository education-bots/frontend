import { redirect } from "next/navigation";

export default async function ChatPage() {
  const id = crypto.randomUUID();
  redirect(`/chat/${id}`);
}
