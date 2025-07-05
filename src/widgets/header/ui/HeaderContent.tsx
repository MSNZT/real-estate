"use client";
import { HeaderMenu } from "./HeaderMenu";
import { useAuth } from "@/entities/user";
import { AuthArea } from "./AuthArea";
import { Heart, MessageSquare, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useAuthRequired } from "@/app/providers/AuthRequiredProvider";
import { Button } from "@/shared/ui";
import Cookies from "js-cookie";

export const HeaderContent = () => {
  const { isLoading, isAuth, isGuest, user } = useAuth();
  console.log(isLoading, isAuth, isGuest, user);
  const { handleOpenPopup } = useAuthRequired();

  function handleChangeTheme() {
    const hasDark = document.body.classList.contains("dark");
    const hasLight = document.body.classList.contains("light");

    if (hasDark || hasLight) {
      document.body.classList.remove("dark", "light");
    }
    const theme = Cookies.get("theme") === "light" ? "dark" : "light";
    document.body.classList.toggle(theme);
    Cookies.set("theme", theme);
  }

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
      <Button
        className="hover:bg-blue-50 transition-colors duration-300 px-2 py-2 rounded-md text-sm"
        variant="clear"
        size="icon"
        onClick={handleChangeTheme}
      >
        {/* <Sun /> */}
        <Moon />
      </Button>
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
