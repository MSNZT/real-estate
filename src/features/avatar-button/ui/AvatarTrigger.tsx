import { Button } from "@/shared/ui";
import { DropdownMenuTrigger } from "@/shared/ui/DropdownMenu";
import { User } from "lucide-react";

export const AvatarTrigger = () => {
  return (
    <DropdownMenuTrigger asChild>
      <Button
        variant="clear"
        size="clear"
        className="items-center justify-center bg-accent relative h-10 w-10 rounded-full hover:bg-blue-50 focus-within:bg-blue-50"
      >
        <User className="h-6 w-6" />
      </Button>
    </DropdownMenuTrigger>
  );
};
