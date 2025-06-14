import { Header } from "@/widgets/header";
import { ReactNode } from "react";
import { SocketProvider } from "../providers/SocketProvider";
import { Container } from "@/shared/ui";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header className="hidden md:block" />
      <SocketProvider>
        <Container className="px-0 md:px-5 flex h-[calc(100dvh-65px)] md:h-[calc(100dvh-70px)] bg-white">
          {children}
        </Container>
      </SocketProvider>
    </>
  );
}
