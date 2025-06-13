"use client";
import { HeaderMenu } from "./HeaderMenu";
import { useAuth } from "@/entities/user/hooks/useAuth";
import { AuthArea } from "./AuthArea";

export const HeaderContent = () => {
  const { isLoading, isAuth, isGuest, user } = useAuth();
  console.log(isLoading, isAuth, isGuest, user);

  return (
    <div className="hidden md:flex items-center gap-4">
      <HeaderMenu />
      <AuthArea isLoading={isLoading} isAuth={isAuth} isGuest={isGuest} />
    </div>
  );
};
