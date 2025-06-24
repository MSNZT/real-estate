"use client";
import { useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { Loader } from "@/shared/ui";
import { useAuth } from "@/entities/user";
import { $apiWithAuth } from "@/shared/api/lib/axios";
import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useChatStore } from "@/shared/hooks/use-chat-store";
import { Message, MessagesResponse } from "../types/chat-list.types";
import { cn } from "@/shared/lib/utils";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { useConnectToChat } from "../api/useConnectToChat";
import { useMessagesInfiniteQuery } from "../api/useMessagesInfiniteQuery";

export const ChatWindow = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const router = useRouter();
  const { id: chatId } = useParams<{ id: string }>();
  const chat = useChatStore((s) => s.chats[chatId]);

  const { isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const { data } = await $apiWithAuth.get(`/chat/${chatId}`);
      if (data.status === "error") {
        router.push("/");
      }
      return data;
    },

    enabled: !!chatId,
  });

  const { query, messages } = useMessagesInfiniteQuery(chatId);

  const handleNewMessage = useCallback(
    (msg: Message) => {
      queryClient.setQueryData(
        ["chat-messages", chatId],
        (old: InfiniteData<MessagesResponse> | undefined) => {
          if (!old) return old;

          const pages = [...old.pages];
          console.log("pages", pages);

          pages[0] = {
            ...pages[0],
            messages: [...pages[0].messages, msg],
          };

          return {
            ...old,
            pages,
          };
        }
      );
    },
    [chatId, queryClient]
  );

  const { isConnected, sendMessage } = useConnectToChat(
    chatId,
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
          <div className="flex items-center justify-center rounded-full h-11 w-11 bg-blue-400  shadow">
            <span className="text-white font-bold text-lg">
              {chat?.companion.name[0]}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">
            {chat?.companion.name}
          </span>
          <span
            className={cn("text-xs text-gray-400", {
              "text-green-400": chat?.onlineStatus,
            })}
          >
            {chat?.onlineStatus ? "В сети" : "Не в сети"}
          </span>
        </div>
      </div>

      <MessageList
        messages={messages}
        userId={user?.id}
        infiniteQuery={query}
      />
      <MessageInput disabled={!isConnected} onSendMessage={handleSendMessage} />
    </section>
  );
};
