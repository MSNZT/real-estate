"use client";
import { HeaderMenu } from "./HeaderMenu";
import { useAuth } from "@/entities/user";
import { AuthArea } from "./AuthArea";
import { Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useAuthRequired } from "@/app/providers/AuthRequiredProvider";

export const HeaderContent = () => {
  const { isLoading, isAuth, isGuest, user } = useAuth();
  console.log(isLoading, isAuth, isGuest, user);
  const { handleOpenPopup } = useAuthRequired();

  return (
    <div className="hidden md:flex items-center gap-4">
      <HeaderMenu
        options={[
          { href: "/favorites", Svg: <Heart /> },
          {
            href: "/chat",
            Svg: <MessageSquare />,
            onClick: (e) => {
              if (isAuth) return;
              e.preventDefault();
              handleOpenPopup("/chat");
            },
          },
        ]}
      />
      <Link
        href="/create-ad"
        className="flex items-center gap-4 bg-primary hover:bg-primary-dark transition-colors duration-300 px-4 py-2 rounded-md
              text-sm"
      >
        <span className="text-white">Разместить объявление</span>
      </Link>
      <AuthArea isLoading={isLoading} isAuth={isAuth} isGuest={isGuest} />
    </div>
  );
};
