"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }: { children: ReactNode }) => {
  if (window !== undefined) {
    return createPortal(children, document.body);
  }

  return null;
};
