"use client";
import { HeaderMenu } from "./HeaderMenu";
import { useAuth } from "@/entities/user";
import { AuthArea } from "./AuthArea";
import { Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useAuthRequiredPopup } from "@/shared/lib/useAuthRequiredPopup";

export const HeaderContent = () => {
  const { isLoading, isAuth, isGuest, user } = useAuth();
  console.log(isLoading, isAuth, isGuest, user);
  const { openAuthPopup, requiredAuthPopup } = useAuthRequiredPopup({});

  return (
    <div className="hidden md:flex items-center gap-4">
      {requiredAuthPopup}
      <HeaderMenu
        options={[
          { href: "/favorites", Svg: <Heart /> },
          {
            href: "/chat",
            Svg: <MessageSquare />,
            onClick: (e) => {
              if (isAuth) return;
              e.preventDefault();
              openAuthPopup("/chat");
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
