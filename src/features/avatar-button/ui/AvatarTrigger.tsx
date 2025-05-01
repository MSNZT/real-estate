import { Button } from "@/shared/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import { DropdownMenuTrigger } from "@/shared/ui/DropdownMenu";
import { User } from "lucide-react";

export const AvatarTrigger = () => {
  return (
    <DropdownMenuTrigger asChild>
      <Button
        variant="clear"
        size="clear"
        className="items-center justify-center bg-accent relative h-10 w-10 rounded-full outline-none"
      >
        <User className="h-6 w-6" />
      </Button>
    </DropdownMenuTrigger>
  );
};
