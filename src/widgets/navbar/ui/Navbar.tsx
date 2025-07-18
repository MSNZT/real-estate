"use client";
import Link from "next/link";
import { useMemo } from "react";
import { AvatarButton } from "@/features/avatar-button";
import { Heart, Home, MessageSquare, PlusCircle, User } from "lucide-react";
import { Button } from "@/shared/ui";
import { useAuth } from "@/entities/user";
import { useAuthRequired } from "@/app/providers/AuthRequiredProvider";

const menuOptions = [
  { text: "Главная", href: "/", Icon: <Home /> },
  { text: "Избранное", href: "/favorites", Icon: <Heart /> },
  { text: "Объявления", href: "/create-ad", Icon: <PlusCircle /> },
  {
    text: "Сообщения",
    href: "/chat",
    Icon: <MessageSquare />,
    isPrivate: true,
  },
  { text: "Профиль", href: "/auth/login", Icon: <User /> },
];

export const Navbar = () => {
  const { isAuth } = useAuth();
  const { handleOpenPopup } = useAuthRequired();
  const renderMenu = useMemo(() => {
    return menuOptions.map((option) => {
      if (option.text === "Профиль") {
        if (isAuth)
          return (
            <li key={option.text}>
              <AvatarButton
                sideOffset={14}
                alignOffset={-60}
                trigger={
                  <Button
                    variant="clear"
                    size="clear"
                    className="flex-col gap-0 items-center justify-center"
                  >
                    {option.Icon}
                    <span className="font-normal text-xs">{option.text}</span>
                  </Button>
                }
              />
            </li>
          );
      }

      if (option.isPrivate) {
        return (
          <li key={option.text}>
            <Link
              href={isAuth ? option.href : "#"}
              onClick={(e) => {
                if (!isAuth) {
                  e.preventDefault();
                  handleOpenPopup(option.href);
                }
              }}
              className="flex flex-col items-center"
            >
              {option.Icon}
              <span>{option.text}</span>
            </Link>
          </li>
        );
      }
      return (
        <li key={option.text}>
          <Link className="flex flex-col items-center" href={option.href}>
            {option.Icon}
            <span>{option.text}</span>
          </Link>
        </li>
      );
    });
  }, [isAuth, handleOpenPopup]);

  return (
    <nav className="fixed md:hidden inset-x-0 bottom-0 p-3 border-t border-gray-200 bg-white z-10">
      <ul className="flex items-center justify-around text-xs">{renderMenu}</ul>
    </nav>
  );
};
