"use client";
import {
  ChatListItem,
  MessagesResponse,
} from "@/features/chat/types/chat-list.types";
import { $apiWithAuth } from "../api/lib/axios";

class ChatService {
  async getChatList(): Promise<ChatListItem[]> {
    try {
      const { data } = await $apiWithAuth.get<ChatListItem[]>("/chat/list");
      return data;
    } catch (error) {
      console.log("Ошибка при запросе списка чатов", error);
      return [];
    }
  }

  async getMessagesByCursor(
    chatId: string,
    pageParam?: string
  ): Promise<MessagesResponse> {
    try {
      const { data } = await $apiWithAuth.get<MessagesResponse>(
        `/chat/${chatId}/messages?limit=10${pageParam ? `&cursor=${pageParam}` : ""}`
      );
      return data;
    } catch (error) {
      console.log("Ошибка при списка сообщений", error);
      throw error;
    }
  }
}

export const chatService = new ChatService();
