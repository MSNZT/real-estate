"use client";
import { createContext, ReactNode, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/entities/user";
import { API_URL } from "@/shared/config/environment";
import { Container, Loader } from "@/shared/ui";

type SocketContextProps = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextProps | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { isAuth, isLoading, user, isGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      const socketSession = io(`${API_URL}/chat`, {
        query: {
          userId: user?.id,
        },
      });
      setSocket(socketSession);

      return () => {
        socketSession.disconnect();
        setSocket(null);
      };
    }
  }, [isAuth]);

  useEffect(() => {
    if (isGuest) {
      router.push("/");
    }
  }, [router, isGuest]);

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center h-[calc(100vh-61px-61px)]">
        <Loader />
      </Container>
    );
  }

  return <SocketContext value={{ socket }}>{children}</SocketContext>;
};

export const useSocket = () => {
  const socket = use(SocketContext);

  if (!socket) {
    throw new Error("Необходимо обернуть компонент в Socket Provider");
  }
  return socket;
};
