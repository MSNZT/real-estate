import { Header } from "@/widgets/header";
import { ReactNode } from "react";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
  params: Promise<{ city: string }>;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
