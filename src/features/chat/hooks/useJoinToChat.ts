import { useSocket } from "@/app/providers/SocketProvider";
import { useEffect, useState } from "react";

export const useJoinToChat = (
  chatId: string,
  onNewMessage: (msg: any) => void
) => {
  const { socket } = useSocket();
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (!chatId || !socket) return;
    socket.emit("join", { channelId: chatId });

    setIsJoined(true);
    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("newMessage", onNewMessage);
    };
  }, [chatId, socket, onNewMessage]);

  const sendMessage = (msg: any) => {
    if (!isJoined) return;
    socket?.emit("sendMessage", { channelId: chatId, ...msg });
  };

  return {
    isJoined,
    sendMessage,
  };
};
