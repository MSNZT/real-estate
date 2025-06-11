import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Message, MessagesResponse } from "../types/chat-list.types";
import { ChatMessage } from "./chat-message";
import { useSocket } from "@/app/providers/SocketProvider";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { $apiWithAuth } from "@/shared/api/lib/axios";

interface MessageListProps {
  messages: Message[];
  userId: string | undefined;
  chatId: string;
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

export const MessageList = ({
  messages,
  userId,
  chatId,
  setMessages,
}: MessageListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isPending: isPendingMessageList, data: response } = useQuery<
    any,
    AxiosError,
    MessagesResponse
  >({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data } = await $apiWithAuth.get(`/chat/${chatId}/messages`);
      setMessages((prev) => [...prev, ...data.messages]);
      return data;
    },

    enabled: !!chatId,
    retry: false,
  });
  //   useEffect(() => {
  //     if (params.id && data?.status === "success") {
  //       if (socket) {
  //         socket.emit("join", { channelId: params.id });

  //         socket.on("newMessage", (data: Message) => {
  //           setMessages((prev) => [...prev, data]);
  //         });

  //         return () => {
  //           socket.off("newMessage");
  //         };
  //       }
  //     }
  //   }, [params.id, data, socket]);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 bg-gradient-to-b from-slate-50 via-white to-slate-100 scroll-smooth">
      {messages?.length === 0 && (
        <div className="text-gray-400 text-center my-20 content-center h-full">
          У вас пока нет сообщений
        </div>
      )}
      {messages?.map((message) => (
        <ChatMessage
          key={message.id}
          {...message}
          isRight={message.authorId === userId}
        />
      ))}
      <div ref={containerRef}></div>
    </div>
  );
};
