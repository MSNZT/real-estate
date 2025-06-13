"use client";

import { useAuthFromParams, useCheckAuth } from "@/entities/user";
import { createContext, ReactNode, use, useMemo } from "react";

type AuthContextType = {
  hasRefresh: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  hasRefresh,
}: {
  children: ReactNode;
  hasRefresh: boolean;
}) => {
  useCheckAuth();
  useAuthFromParams();

  console.log("provider", hasRefresh);

  const value = useMemo(() => ({ hasRefresh }), [hasRefresh]);

  console.log("provider Value", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const ctx = use(AuthContext);
  if (!ctx)
    throw new Error("useAuthContext должен быть обёрнут в AuthProvider");
  return ctx;
}
