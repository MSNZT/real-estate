import type { ReactNode } from "react";

export type UserActionItemType = {
  href?: string;
  onClick?: () => void;
  Icon: ReactNode;
  text: string;
};
