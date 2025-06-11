"use client";
import { Container, Input } from "@/shared/ui";
import { Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { $apiWithAuth } from "@/shared/api/lib/axios";
import { useAuth } from "@/entities/user/hooks/useAuth";
import { ChatList } from "./chat-list";
import { ChatWindow } from "./chat-window";
import { AxiosError, AxiosResponse } from "axios";
import { ChatListItem } from "../types/chat-list.types";

export const Chat = () => {
  const { user } = useAuth();
  const params = useParams<{ id: string }>();

  const { isPending: isPendingChatList, data: chatList } = useQuery<
    any,
    AxiosError,
    AxiosResponse<ChatListItem[]>
  >({
    queryKey: ["chatList"],
    queryFn: () => $apiWithAuth.get("http://localhost:5001/api/chat/list"),
    enabled: !!user,
  });

  return (
    <Container>
      <div className="flex">
        <div className="max-w-[340px] border-r border-r-gray-300 w-full">
          <div className="p-4">
            <h1 className="mb-2 font-medium text-2xl">Чаты</h1>
            <div className="relative px-4 bg-gray-200/80 rounded-lg">
              <Input
                placeholder="Введите имя"
                className="border-0 bg-transparent"
                // value={message}
                onChange={(e) => console.log(e.target.value)}
              />
              <Search
                size={12}
                className="absolute top-1/2 -translate-y-1/2 left-2 stroke-gray-500"
              />
            </div>
          </div>
          <ChatList chatList={chatList?.data} />
        </div>
        <ChatWindow userId={user?.id} />
      </div>
    </Container>
  );
};
