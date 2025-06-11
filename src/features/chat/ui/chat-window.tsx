"use client";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { ChatMessage } from "./chat-message";
import { Input, Button, Loader } from "@/shared/ui";
import { useAuth } from "@/entities/user/hooks/useAuth";
import { $apiWithAuth } from "@/shared/api/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import { useParams, useRouter } from "next/navigation";
import { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useSocket } from "@/app/providers/SocketProvider";
import { useOnlineStore } from "@/shared/hooks/use-online-store";
import { Message, MessagesResponse } from "../types/chat-list.types";
import { cn } from "@/shared/lib/utils";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { useJoinToChat } from "../hooks/useJoinToChat";

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

  const { isJoined, sendMessage } = useJoinToChat(params.id, handleNewMessage);

  function handleSendMessage(message: string) {
    if (user?.id) {
      sendMessage({ authorId: user.id, date: new Date(), text: message });
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100%-70px)] flex-1">
        <Loader />
      </div>
    );
  }

  return (
    <section className="flex-1 flex flex-col h-full bg-white shadow-lg overflow-hidden max-h-[calc(100vh-65px-60px)] md:max-h-[calc(100vh-70px)]">
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
      <MessageInput disabled={!isJoined} onSendMessage={handleSendMessage} />
    </section>
  );
};
