export type ChatListItem = {
  chatId: string;
  companion: ChatListItemCompanion;
  lastMessage: ChatListItemLastMessage;
};

type ChatListItemCompanion = {
  id: string;
  name: string;
};

type ChatListItemLastMessage = {
  text: string;
  createdAt: Date;
  userId: string;
};

export type MessagesResponse = {
  companion: ChatListItemCompanion;
  messages: Message[];
};

export type Message = {
  authorId: string;
  chatId: string;
  createdAt: string;
  id: string;
  text: string;
  updatedAt: string;
};
