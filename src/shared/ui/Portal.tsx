"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "../lib/useIsMounted";

export const Portal = ({ children }: { children: ReactNode }) => {
  const isMounted = useIsMounted();
  if (isMounted) {
    return createPortal(children, document.body);
  }

  return null;
};
