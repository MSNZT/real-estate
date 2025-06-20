"use client";
import { AuthRequiredPopup } from "@/widgets/auth-required-popup";
import {
  createContext,
  ReactNode,
  use,
  useCallback,
  useMemo,
  useState,
} from "react";

type AuthRequiredContextProps = {
  isOpen: boolean;
  handleOpenPopup: (redirect?: string) => void;
  handleClosePopup: (redirect?: string) => void;
};

const AuthRequiredContext = createContext<AuthRequiredContextProps | null>(
  null
);

export const AuthRequiredProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");

  const handleOpenPopup = useCallback((redirect?: string) => {
    setIsOpen(true);
    if (redirect) setRedirectTo(redirect);
  }, []);

  const handleClosePopup = useCallback((redirect?: string) => {
    setIsOpen(false);
    if (redirect) setRedirectTo(redirect);
  }, []);

  const value = useMemo(
    () => ({ isOpen, handleOpenPopup, handleClosePopup }),
    [isOpen, handleOpenPopup, handleClosePopup]
  );

  return (
    <AuthRequiredContext value={value}>
      {children}
      <AuthRequiredPopup
        isOpen={isOpen}
        onClose={() => handleClosePopup()}
        redirect={redirectTo}
      />
    </AuthRequiredContext>
  );
};

export const useAuthRequired = () => {
  const auth = use(AuthRequiredContext);
  if (!auth) {
    throw new Error(
      "useAuthRequired должен быть обёрнут в AuthRequiredProvider"
    );
  }
  return auth;
};
