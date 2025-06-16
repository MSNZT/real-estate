"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  use,
  useMemo,
  useState,
} from "react";

type AuthContextType = {
  hasRefresh: boolean;
  setHasRefresh: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  hasRefresh: initialRefresh,
}: {
  children: ReactNode;
  hasRefresh: boolean;
}) => {
  const [hasRefresh, setHasRefresh] = useState(initialRefresh);
  const value = useMemo(() => ({ hasRefresh, setHasRefresh }), [hasRefresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const ctx = use(AuthContext);
  if (!ctx)
    throw new Error("useAuthContext должен быть обёрнут в AuthProvider");
  return ctx;
}
