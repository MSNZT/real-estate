"use client";
import { useCallback, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Loader } from "@/shared/ui";
import { useAuth } from "@/entities/user";
import { $apiWithAuth } from "@/shared/api/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useOnlineStore } from "@/shared/hooks/use-online-store";
import { Message } from "../types/chat-list.types";
import { cn } from "@/shared/lib/utils";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { useConnectToChat } from "../hooks/useConnectToChat";

export const ChatWindow = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { isLoading } = useQuery({
    queryKey: ["chat", params.id],
    queryFn: async () => {
      const { data } = await $apiWithAuth.get(`/chat/${params.id}`);
      if (data.status === "error") {
        router.push("/");
      }
      return data;
    },

    enabled: !!params.id,
  });

  const onlineMap = useOnlineStore((state) => state.onlineMap);
  // const isOnline = onlineMap[response?.companion.id ?? ""];

  const handleNewMessage = useCallback((msg: any) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const { isConnected, sendMessage } = useConnectToChat(
    params.id,
    handleNewMessage
  );

  function handleSendMessage(message: string) {
    if (user?.id) {
      sendMessage({ authorId: user.id, date: new Date(), text: message });
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <Loader />
      </div>
    );
  }

  return (
    <section className="flex-1 flex flex-col h-full bg-white border-r border-gray-200 overflow-hidden">
      <div className="flex items-center gap-4 bg-white h-16 border-b border-gray-200 px-6 py-2 z-10">
        <div className="flex items-center gap-2">
          <Link className="md:hidden" href="/chat">
            <ArrowLeft />
          </Link>
          <div className="flex items-center justify-center rounded-full h-11 w-11 bg-gradient-to-tr from-blue-400 to-indigo-400 shadow">
            <span className="text-white font-bold text-lg">И</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">Имя</span>
          <span className={cn("text-xs text-green-400")}>
            {/* {isOnline ? "В сети" : "Не в сети"} */}В сети
          </span>
        </div>
      </div>

      <MessageList
        messages={messages}
        userId={user?.id}
        chatId={params.id}
        setMessages={setMessages}
      />
      <MessageInput disabled={!isConnected} onSendMessage={handleSendMessage} />
    </section>
  );
};
