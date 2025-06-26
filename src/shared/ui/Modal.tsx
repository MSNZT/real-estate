import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import { Portal } from "./Portal";
import { cn } from "../lib/utils";
import { useClickOutSide } from "../lib/useClickOutside";

interface ModalProps {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

export const Modal = ({
  isOpen,
  className,
  children,
  handleClose,
}: ModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutSide(containerRef, () => handleClose(false));

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    isOpen && (
      <Portal>
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-stretch md:items-center justify-center bg-black/60"
          )}
        >
          <div ref={containerRef} className={cn("", className)}>
            {children}
          </div>
        </div>
      </Portal>
    )
  );
};
