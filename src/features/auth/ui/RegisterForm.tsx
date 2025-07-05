"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button, FieldInput, FieldInputPassword } from "@/shared/ui";
import type { RegisterData } from "../types/auth";
import { useAuthMutations } from "../api/useAuthMutations";
import { registerSchema } from "../schema/schema";
import { PhoneInputField } from "./PhoneInputField";
import toast from "react-hot-toast";
import { useRedirectTo } from "./useRedirectTo";

export const RegisterForm = () => {
  const methods = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isDirty, isValid },
  } = methods;

  const { register } = useAuthMutations();
  const { isPending, mutateAsync, error } = register;
  const { handleRedirect } = useRedirectTo();

  async function handleRegister(dto: RegisterData) {
    try {
      const { confirmPassword, ...otherDto } = dto;
      const registerData = {
        ...otherDto,
        phone: dto.phone.replace(/\D/g, ""),
      };
      await mutateAsync(registerData);
      toast.success("Вы успешно зарегистрировались", { duration: 2000 });
      handleRedirect();
    } catch (error) {
      toast.error("Возникла ошибка при регистрации", { duration: 2000 });
    }
  }

  const submitDisabled = !isDirty || !isValid || isPending;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleRegister)}
        className="flex flex-col gap-4"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-col gap-2">
          <FieldInput name="name" label="Имя" type="text" />
          <FieldInput name="email" label="E-mail" type="email" />
          <PhoneInputField name="phone" label="Телефон" />
          <FieldInputPassword name="password" label="Пароль" />
          <FieldInputPassword name="confirmPassword" label="Повторите пароль" />
        </div>
        <div className="flex items-center gap-1">
          <p>Есть аккаунт?</p>
          <Link href="/auth/login">
            <span className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Войти
            </span>
          </Link>
        </div>
        <Button
          disabled={submitDisabled}
          type="submit"
          className="justify-center mb-5"
        >
          <span className="text-white">Зарегистрироваться</span>
        </Button>
      </form>
    </FormProvider>
  );
};
