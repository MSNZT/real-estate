import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export const Container = ({
  className,
  children,
  ...props
}: ContainerProps) => {
  return (
    <div className={cn("max-w-[1280px] mx-auto px-5", className)} {...props}>
      {children}
    </div>
  );
};
