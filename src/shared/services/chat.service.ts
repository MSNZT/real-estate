"use client";
import { ChatListItem } from "@/features/chat/types/chat-list.types";
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
}

export const chatService = new ChatService();
