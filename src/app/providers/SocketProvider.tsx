"use client";
import { useAuth } from "@/entities/user/hooks/useAuth";
import { Container, Loader } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, use, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextProps = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextProps | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket>(null);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    socketRef.current = io("http://localhost:5001/chat", {
      query: {
        userId: user?.id,
      },
    });

    socketRef.current.emit("getOnlineStatus");

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center h-[calc(100vh-61px-61px)]">
        <Loader />
      </Container>
    );
  }

  return (
    <SocketContext value={{ socket: socketRef.current }}>
      {children}
    </SocketContext>
  );
};

export const useSocket = () => {
  const socket = use(SocketContext);

  if (!socket) {
    throw new Error("Необходимо обернуть компонент в Socket Provider");
  }
  return socket;
};
