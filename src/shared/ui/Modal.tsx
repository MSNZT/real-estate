import { ReactNode } from "react";
import { Portal } from "./Portal";
import { cn } from "../lib/utils";

interface ModalProps {
  isLayout?: boolean;
  className?: string;
  children: ReactNode;
}

export const Modal = ({ isLayout = true, className, children }: ModalProps) => {
  if (isLayout) {
    return (
      <Portal>
        <div className={cn("fixed inset-0 bg-black/10", className)}>
          <div>{children}</div>
        </div>
      </Portal>
    );
  }

  return (
    <Portal>
      <div className={className}>{children}</div>
    </Portal>
  );
};
