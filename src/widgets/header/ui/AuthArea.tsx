"use client";

import { User } from "@/entities/user";
import { AvatarButton } from "@/features/avatar-button";
import { tokenService } from "@/shared/services/token.service";
import { Button, Loader } from "@/shared/ui";
import { User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface AuthArea {
  isLoading: boolean;
  isAuth: boolean;
  user: User;
  isMounted: boolean;
}

export const AuthArea = ({ isLoading, isAuth, user, isMounted }: AuthArea) => {
  if (isLoading && !isAuth) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

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
            <UserIcon className="h-6 w-6" />
          </Button>
        }
      />
    );
  }

  return (
    <Link
      href="/auth/login"
      className="flex items-center gap-2 bg-slate-400 hover:bg-slate-600 transition-colors duration-300 px-4 py-2 rounded-md text-white text-sm"
    >
      <UserIcon />
      <span>Войти</span>
    </Link>
  );
};
