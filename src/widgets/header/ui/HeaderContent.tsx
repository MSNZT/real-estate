"use client";
import { HeaderMenu } from "./HeaderMenu";
import { useAuth } from "@/entities/user/hooks/useAuth";
import { AuthArea } from "./AuthArea";

export const HeaderContent = () => {
  const { user, isLoading, isAuth } = useAuth();

  console.log(isLoading);

  return (
    <div className="hidden md:flex items-center gap-4">
      <HeaderMenu />
      <AuthArea isLoading={isLoading} isAuth={isAuth} user={user} />
    </div>
  );
};
