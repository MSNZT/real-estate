"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FieldInput, Separator } from "@/shared/ui";
import { registerSchema } from "../dto/registerSchema";
import { OAuthButtons } from "./OAuthButtons";
import type { RegisterData } from "../types/auth";
import type { ReactNode } from "react";

interface RegisterFormProps {
  error?: string;
  onSubmit: (data: RegisterData) => void;
  submitButton: ReactNode;
}

export const RegisterForm = ({
  onSubmit,
  error,
  submitButton,
}: RegisterFormProps) => {
  const methods = useForm({
    resolver: zodResolver(registerSchema),
  });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-col gap-4">
          <FieldInput name="name" label="Имя" type="text" />
          <FieldInput name="email" label="E-mail" type="email" />
          <FieldInput name="password" label="Пароль" type="password" />
          <FieldInput
            name="confirmPassword"
            label="Повторите пароль"
            type="password"
          />
        </div>
        <div className="flex items-center gap-1">
          <p>Есть аккаунт?</p>
          <Link
            href="/auth/login"
            className="text-sm text-blue-600 font-semibold"
          >
            Войти
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
};
