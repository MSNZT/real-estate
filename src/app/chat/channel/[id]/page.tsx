"use client";
import { ChatSidebar } from "@/features/chat/ui/chat-sidebar";
import { ChatWindow } from "@/features/chat/ui/chat-window";

export default function Page() {
  return (
    <div className="flex w-full">
      <div className="hidden md:block">
        <ChatSidebar />
      </div>
      <ChatWindow />
    </div>
  );
}
