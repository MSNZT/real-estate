"use client";
import { DropdownMenu } from "@/shared/ui/DropdownMenu";
import { AvatarTrigger } from "./AvatarTrigger";
import { Align, AvatarContent } from "./AvatarContent";
import { useAuthMutations } from "@/features/auth";
import { LogOut, Settings, User } from "lucide-react";
import { ReactElement } from "react";

interface AvatarButtonProps {
  trigger: ReactElement;
  sideOffset?: number;
  alignOffset?: number;
  align?: Align;
}

export const AvatarButton = ({
  trigger,
  sideOffset = 0,
  alignOffset = 0,
  align = "start",
}: AvatarButtonProps) => {
  const { logout } = useAuthMutations();

  async function handleLogout() {
    await logout.mutateAsync();
  }

  return (
    <DropdownMenu>
      <AvatarTrigger trigger={trigger} />
      <AvatarContent
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        align={align}
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
