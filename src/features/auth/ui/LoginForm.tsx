"use client";
import Link from "next/link";
import { Button, FieldInput, FieldInputPassword } from "@/shared/ui";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginData } from "../types/auth";
import { useAuthMutations } from "../api/useAuthMutations";
import { loginSchema } from "../schema/schema";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRedirectTo } from "./useRedirectTo";

export function LoginForm() {
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { login } = useAuthMutations();
  const { mutateAsync, isPending, error } = login;
  const { handleRedirect } = useRedirectTo();

  async function handleLogin(data: LoginData) {
    try {
      await mutateAsync(data);
      queryClient.setQueryData(["auth"], data);
      toast.success("Вы успешно авторизовались", { duration: 2000 });
      handleRedirect();
    } catch (error) {}
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleLogin)}
        className="flex flex-col gap-4"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-col gap-2">
          <FieldInput name="email" label="E-mail" />
          <FieldInputPassword name="password" label="Пароль" />
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <p>Нет аккаунта?</p>
            <Link href="/auth/register">
              <span className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Зарегистрироваться
              </span>
            </Link>
          </div>
          <div>
            <Link href="/auth/forget-password">
              <span className="text-sm hover:underline underline-offset-2 font-medium">
                Забыли пароль?
              </span>
            </Link>
          </div>
        </div>
        <Button
          disabled={isPending}
          type="submit"
          className="justify-center mb-5"
        >
          <span className="text-white">Войти</span>
        </Button>
      </form>
    </FormProvider>
  );
}
