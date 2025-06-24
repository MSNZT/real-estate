import { chatService } from "@/shared/services/chat.service";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Message, MessagesResponse } from "../types/chat-list.types";
import { useMemo } from "react";

export const useMessagesInfiniteQuery = (chatId: string) => {
  const query = useInfiniteQuery<
    MessagesResponse,
    AxiosError,
    InfiniteData<MessagesResponse>,
    unknown[],
    string | undefined
  >({
    queryKey: ["chat-messages", chatId],
    queryFn: async ({ pageParam }) => {
      console.log("pageParams", pageParam);

      return await chatService.getMessagesByCursor(chatId, pageParam);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!chatId,
    refetchOnWindowFocus: false,
  });

  const messages = query.data?.pages.flatMap((page) => page.messages) ?? [];
  return {
    query,
    messages,
  };
};
