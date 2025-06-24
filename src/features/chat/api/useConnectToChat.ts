import { useSocket } from "@/app/providers/SocketProvider";
import { useEffect, useState } from "react";
import { Message } from "../types/chat-list.types";

export const useConnectToChat = (
  chatId: string,
  onNewMessage: (msg: Message) => void
) => {
  const { socket } = useSocket();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!chatId || !socket) return;
    socket.emit("join", { channelId: chatId });

    setIsConnected(true);
    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("newMessage", onNewMessage);
    };
  }, [chatId, socket, onNewMessage]);

  const sendMessage = (msg: any) => {
    if (!isConnected) return;
    socket?.emit("sendMessage", { channelId: chatId, ...msg });
  };

  return {
    isConnected,
    sendMessage,
  };
};
