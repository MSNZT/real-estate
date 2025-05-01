"use client";
import { DropdownMenu } from "@/shared/ui/DropdownMenu";
import { AvatarTrigger } from "./AvatarTrigger";
import { AvatarContent } from "./AvatarContent";
import { useAuthData } from "@/entities/user";
import { useAuth } from "@/features/auth";
import { tokenService } from "@/shared/services/token.service";
import { LogOut, Settings, User } from "lucide-react";

export const AvatarButton = () => {
  const { setAuthData } = useAuthData();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout.mutateAsync();
    tokenService.removeAccessToken();
    setAuthData({ isAuth: false, userData: null });
  }

  return (
    <DropdownMenu>
      <AvatarTrigger />
      <AvatarContent
        items={[
          {
            href: "/profile",
            Icon: <User className="mr-2 h-4 w-4" />,
            text: "Профиль",
          },
          {
            href: "/profile",
            Icon: <Settings className="mr-2 h-4 w-4" />,
            text: "Настройки",
          },
          {
            onClick: handleLogout,
            Icon: <LogOut className="mr-2 h-4 w-4" />,
            text: "Выйти",
          },
        ]}
      />
    </DropdownMenu>
  );
};
