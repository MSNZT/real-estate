"use client";
import Link from "next/link";
import { AvatarButton } from "@/features/avatar-button";
import { HeaderMenu } from "./HeaderMenu";
import { useAuthData } from "@/entities/user";
import { User } from "lucide-react";
import { Loader } from "@/shared/ui";

export const HeaderContent = () => {
  const { isAuth, isLoading } = useAuthData();

  return (
    <div className="hidden md:flex items-center gap-4">
      <HeaderMenu />
      {isLoading && <Loader />}
      {isAuth && <AvatarButton />}
      {!isLoading && !isAuth && (
        <Link
          href="/auth/login"
          className="flex items-center gap-2 bg-slate-400 hover:bg-slate-600 transition-colors duration-300 px-4 py-2 rounded-md
                    text-white text-sm"
        >
          <User />
          <span>Войти</span>
        </Link>
      )}
    </div>
  );
};
