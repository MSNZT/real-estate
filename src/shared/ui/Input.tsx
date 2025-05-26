import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils";

export const Input = ({
  className,
  type,
  ...props
}: ComponentProps<"input">) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-default disabled:bg-[#eee] disabled:text-[#ececec] md:text-sm",
        className
      )}
      {...props}
    />
  );
};
