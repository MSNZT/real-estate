import { DropdownMenuTrigger } from "@/shared/ui/DropdownMenu";
import { ReactElement } from "react";

export const AvatarTrigger = ({ trigger }: { trigger: ReactElement }) => {
  return <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>;
};
