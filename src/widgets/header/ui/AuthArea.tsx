"use client";

import { AvatarButton } from "@/features/avatar-button";
import { Button, Loader } from "@/shared/ui";
import { User } from "lucide-react";
import Link from "next/link";

export const AuthArea = ({ isLoading, isAuth, user }) => {
  // Показываем Loader, пока идет загрузка
  if (isLoading && !isAuth) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  // Если авторизован и есть данные — показываем аватар
  if (isAuth && user) {
    return (
      <AvatarButton
        alignOffset={-80}
        sideOffset={10}
        trigger={
          <Button
            variant="clear"
            size="clear"
            className="items-center justify-center h-10 w-10 rounded-full hover:bg-blue-50 focus-within:bg-blue-50"
          >
            <User className="h-6 w-6" />
          </Button>
        }
      />
    );
  }

  // Если не авторизован — показываем кнопку "Войти"
  return (
    <Link
      href="/auth/login"
      className="flex items-center gap-2 bg-slate-400 hover:bg-slate-600 transition-colors duration-300 px-4 py-2 rounded-md text-white text-sm"
    >
      <User />
      <span>Войти</span>
    </Link>
  );
};
