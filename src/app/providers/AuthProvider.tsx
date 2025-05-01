"use client";

import { useAuthFromParams, useCheckAuth } from "@/entities/user";
import { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  useCheckAuth();
  useAuthFromParams();

  return children;
};
