import { useSocket } from "@/app/providers/SocketProvider";
import { useEffect } from "react";
import { useOnlineStore } from "./use-online-store";

export const useOnline = (companionIds: string[]) => {
  const { socket } = useSocket();
  const requsted = useOnlineStore((state) => state.requested);
  const addRequsted = useOnlineStore((state) => state.addRequested);
  const setMany = useOnlineStore((state) => state.setMany);

  useEffect(() => {
    const toRequest = companionIds.filter((id) => !requsted.has(id));
    if (!socket || toRequest.length === 0) return;

    addRequsted(companionIds);
    socket.emit("getOnlineStatus", { companionIds });
  }, [requsted, socket, companionIds, addRequsted]);

  useEffect(() => {
    if (!socket) return;
    const handleOnline = ({ userId }: { userId: string }) =>
      setMany({ [userId]: true });
    const handleOffline = ({ userId }: { userId: string }) =>
      setMany({ [userId]: false });

    socket.on("userOnline", handleOnline);
    socket.on("userOffline", handleOffline);

    return () => {
      socket.off("userOnline", handleOnline);
      socket.off("userOffline", handleOffline);
    };
  }, [socket, setMany]);
};
