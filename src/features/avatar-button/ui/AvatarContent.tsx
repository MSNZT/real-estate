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
    <DropdownMenuContent className="bg-white border-gray-200">
      {items.map((item) => (
        <DropdownMenuItem key={item.text} className="hover:bg-blue-50">
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
