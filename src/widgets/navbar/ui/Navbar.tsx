"use client";
import Link from "next/link";
import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Heart,
  Home,
  LogOut,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import { Button } from "@/shared/ui";
import { useAuthData } from "@/entities/user";

const menuOptions = [
  { text: "Главная", href: "/", Icon: <Home /> },
  { text: "Избранное", href: "/favorites", Icon: <Heart /> },
  { text: "Объявления", href: "/create-ad", Icon: <PlusCircle /> },
  { text: "Сообщения", href: "/messages", Icon: <MessageSquare /> },
  { text: "Профиль", href: "/auth/login", Icon: <User /> },
];

export const Navbar = () => {
  const { isAuth, isLoading } = useAuthData();
  const renderMenu = useMemo(() => {
    return menuOptions.map((option) => {
      if (option.href === "/auth/login") {
        if (isAuth)
          return (
            <li key={option.href}>
              <UserMenu />
            </li>
          );
      }
      return (
        <li key={option.href}>
          <Link className="flex flex-col items-center" href={option.href}>
            {option.Icon}
            <span>{option.text}</span>
          </Link>
        </li>
      );
    });
  }, [isAuth, isLoading]);

  return (
    <nav className="fixed md:hidden inset-x-0 bottom-0 p-3 border-t border-gray-200 bg-white">
      <ul className="flex items-center justify-evenly text-xs">{renderMenu}</ul>
    </nav>
  );
};

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="clear"
          size="clear"
          className="flex flex-col items-center gap-0"
        >
          <User />
          <span className="text-xs font-normal">Профиль</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={14}>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Профиль</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Настройки</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
