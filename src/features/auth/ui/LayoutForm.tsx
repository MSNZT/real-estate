"use client";
import toast from "react-hot-toast";
import { useAuth } from "../api/useAuth";
import { LoginForm } from "./LoginForm";
import { LoginData, RegisterData } from "../types/auth";
import { RegisterForm } from "./RegisterForm";
import { Button } from "@/shared/ui";

interface LayoutFormProps {
  slug: string;
}

export const LayoutForm = ({ slug }: LayoutFormProps) => {
  const title = slug === "login" ? "Авторизация" : "Регистрация";
  const { login, register } = useAuth();

  async function onSubmit(data: LoginData | RegisterData) {
    if (slug === "login") {
      await login.mutateAsync(data as LoginData);
      toast.success("Вы успешно авторизовались", {
        duration: 4000,
        position: "top-center",
      });
    }

    if (slug === "register") {
      await register.mutateAsync(data as RegisterData);
      toast.success("Вы успешно зарегистрировались", {
        duration: 4000,
        position: "top-center",
      });
    }
  }

  return (
    <div className="flex-1 flex justify-center gap-3 items-center mt-20 sm:mt-40">
      <div className="bg-white rounded-lg sm:shadow-md max-w-[500px] p-4 w-full">
        <h1 className="font-bold text-center text-2xl mb-6">{title}</h1>
        {slug === "login" && (
          <LoginForm
            submitButton={
              <Button
                disabled={login.isPending}
                type="submit"
                className="mb-5 justify-center"
              >
                Войти
              </Button>
            }
            onSubmit={(data) => onSubmit(data)}
            error={login.error?.response.data.errors.message}
          />
        )}
        {slug === "register" && (
          <RegisterForm
            submitButton={
              <Button
                disabled={register.isPending}
                type="submit"
                className="mb-5 justify-center"
              >
                Зарегистрироваться
              </Button>
            }
            onSubmit={(data) => onSubmit(data)}
            error={register.error?.response.data.errors.message}
          />
        )}
      </div>
    </div>
  );
};
