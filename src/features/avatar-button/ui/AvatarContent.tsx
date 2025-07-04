import Link from "next/link";
import { Button } from "@/shared/ui";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/ui/DropdownMenu";
import { UserActionItemType } from "../model/types/avatar-button";
import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

export type Align = DropdownMenuContentProps["align"];

interface AvatarContentProps {
  items: UserActionItemType[];
  sideOffset: number;
  alignOffset: number;
  align?: Align;
}

export const AvatarContent = ({
  items,
  sideOffset,
  align = "start",
  alignOffset,
}: AvatarContentProps) => {
  return (
    <DropdownMenuContent
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      align={align}
      className="bg-white border-gray-200"
    >
      {items.map((item) => (
        <DropdownMenuItem key={item.text} className="hover:bg-blue-50 p-0">
          {item.href ? (
            <Link href={item.href} className="w-full px-3 py-1.5">
              <span>{item.text}</span>
            </Link>
          ) : (
            <Button
              className="w-full px-3 py-1.5"
              variant="clear"
              size="clear"
              onClick={item.onClick}
            >
              <span>{item.text}</span>
            </Button>
          )}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
