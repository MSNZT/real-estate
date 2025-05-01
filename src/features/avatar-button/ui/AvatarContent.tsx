import Link from "next/link";
import { Button } from "@/shared/ui";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/ui/DropdownMenu";
import { UserActionItemType } from "../model/types/avatar-button";

interface AvatarContentProps {
  items: UserActionItemType[];
}

export const AvatarContent = ({ items }: AvatarContentProps) => {
  return (
    <DropdownMenuContent>
      {items.map((item) => (
        <DropdownMenuItem key={item.text}>
          {item.href ? (
            <Link href={item.href}>
              <span>{item.text}</span>
            </Link>
          ) : (
            <Button variant="clear" size="clear" onClick={item.onClick}>
              <span>{item.text}</span>
            </Button>
          )}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
