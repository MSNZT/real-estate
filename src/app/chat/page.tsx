"use client";
import { ChatSidebar } from "@/features/chat/ui/chat-sidebar";

export default function Page() {
  return (
    <>
      <ChatSidebar />
      <main className="hidden md:block h-[calc(100vh-70px-20px)] flex-1">
        <div className="flex flex-col items-center justify-center h-full text-gray-400 select-none">
          <span className="text-6xl mb-6">💬</span>
          <h2 className="text-xl font-semibold mb-2">
            Добро пожаловать в чат!
          </h2>
          <p className="text-center max-w-xs">
            Чтобы начать общение, выберите чат <br />в меню слева.
          </p>
        </div>
      </main>
    </>
  );
}

// <main className="hidden md:flex flex-col flex-1 min-w-0">
//   {children}
// </main>
