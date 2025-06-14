"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useAuthMutations } from "../api/useAuthMutations";
import { Button, FieldInputPassword, Loader } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../schema/schema";
import { PasswordData } from "../types/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface NewPasswordFormProps {
  code: string;
  email: string;
}

export const NewPasswordForm = ({ code, email }: NewPasswordFormProps) => {
  const { changePassword } = useAuthMutations();
  const { mutateAsync, isPending } = changePassword;
  const router = useRouter();

  const methods = useForm<PasswordData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  async function onSubmit(data: PasswordData) {
    await mutateAsync({ code, email, password: data.password });
    toast.success("Пароль успешно изменён", { duration: 2000 });
    router.push("/auth/login");
  }

  const disabledButton = isPending || !methods.formState.isValid;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <FieldInputPassword
            name="password"
            placeholder="Минимум 8 символов"
            label="Пароль"
          />
          <FieldInputPassword
            name="confirmPassword"
            placeholder="Повторите пароль"
            label="Подтвердите пароль"
          />
          <div>
            <p>Пароль должен содержать:</p>
            <ul>
              <li>
                <span>Минимум 8 символов</span>
              </li>
              <li>
                <span>Рекомендуется использовать буквы, цифры и символы</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-end">
            <Button disabled={disabledButton} type="submit">
              {isPending ? (
                <Loader className="border-white w-5 h-5" />
              ) : (
                "Сбросить пароль"
              )}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
