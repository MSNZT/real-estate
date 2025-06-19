import { Header } from "@/widgets/header";
import { ReactNode } from "react";

export default function OfferLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      {children}
    </>
  );
}
