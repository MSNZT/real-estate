import { Header } from "@/widgets/header";
import { ReactNode } from "react";

export default async function CreateAdLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
