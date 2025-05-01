"use client";
import Link from "next/link";
import { Button, FieldInput, Separator } from "@/shared/ui";
import { OAuthButtons } from "./OAuthButtons";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../dto/loginSchema";
import type { LoginData } from "../types/auth";
import type { ReactNode } from "react";

interface LoginFormProps {
  submitButton: ReactNode;
  error?: string;
  onSubmit: (data: LoginData) => void;
}

export function LoginForm({ submitButton, error, onSubmit }: LoginFormProps) {
  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-col gap-4">
          <FieldInput name="email" label="E-mail" />
          <FieldInput name="password" label="Пароль" type="password" />
        </div>
        <div className="flex-сol items-center justify-between">
          <div className="flex items-center gap-1">
            <p>Нет аккаунта?</p>
            <Link href="/auth/register">
              <span className="text-sm underline underline-offset-2 font-medium">
                Зарегистрироваться
              </span>
            </Link>
          </div>
          <Link href="/public">
            <span className="text-sm hover:underline underline-offset-2 font-medium">
              Забыли пароль?
            </span>
          </Link>
        </div>
        {submitButton}
        <div className="relative sm:mb-4">
          <span className="absolute -top-[12px] left-1/2 -translate-x-1/2 bg-white text-slate-500 px-4">
            или
          </span>
          <Separator />
        </div>

        <OAuthButtons />
      </form>
    </FormProvider>
  );
}
