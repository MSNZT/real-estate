import { useSocket } from "@/app/providers/SocketProvider";
import { useEffect } from "react";
import { useChatStore } from "./use-chat-store";

export const useOnline = (chatId: string) => {
  const { socket } = useSocket();
  // const requsted = useOnlineStore((state) => state.requested);
  // const addRequsted = useOnlineStore((state) => state.addRequested);
  // const setMany = useOnlineStore((state) => state.setMany);
  const setCompanionOnlineStatus = useChatStore(
    (s) => s.setCompanionOnlineStatus
  );

  // useEffect(() => {
  //   const toRequest = companionIds.filter((id) => !requsted.has(id));
  //   if (!socket || toRequest.length === 0) return;

  //   addRequsted(companionIds);
  //   socket.emit("getOnlineStatus", { companionIds });
  // }, [requsted, socket, companionIds, addRequsted]);

  useEffect(() => {
    if (!socket) return;
    const handleOnline = () => setCompanionOnlineStatus(chatId, true);
    const handleOffline = () => setCompanionOnlineStatus(chatId, false);

    socket.on("userOnline", handleOnline);
    socket.on("userOffline", handleOffline);

    return () => {
      socket.off("userOnline", handleOnline);
      socket.off("userOffline", handleOffline);
    };
  }, [socket, setCompanionOnlineStatus]);
};
