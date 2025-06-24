import { create } from "zustand";

type ChatInfo = {
  chatId: string;
  companion: Companion;
  lastMessage: LastMessage;
  onlineStatus: boolean;
};

type Companion = {
  id: string;
  name: string;
};

type LastMessage = {
  text: string;
  createdAt: string;
  userId: string;
};

type ChatStoreState = {
  chats: Record<string, ChatInfo>;
};

type ChatStoreAction = {
  setChat: (chatId: string, data: ChatInfo) => void;
  setChats: (chats: ChatInfo[]) => void;
  setCompanionOnlineStatus: (chatId: string, online: boolean) => void;
};

type ChatStore = ChatStoreState & ChatStoreAction;

const initialState = {
  chats: {},
};

export const useChatStore = create<ChatStore>((set) => ({
  ...initialState,
  setChat: (chatId, data) =>
    set((state) => ({
      chats: { ...state.chats, [chatId]: data },
    })),
  setChats: (chatList) =>
    set((state) => {
      const newChats = { ...state.chats };
      chatList.forEach((chatItem) => {
        newChats[chatItem.chatId] = chatItem;
      });
      return {
        chats: newChats,
      };
    }),
  setCompanionOnlineStatus: (chatId, status) =>
    set((state) => ({
      chats: {
        ...state.chats,
        [chatId]: {
          ...state.chats[chatId],
          onlineStatus: status,
        },
      },
    })),
}));
