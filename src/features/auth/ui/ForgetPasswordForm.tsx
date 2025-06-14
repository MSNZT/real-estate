"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useAuthMutations } from "../api/useAuthMutations";
import { Button, FieldInput, Loader } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "../schema/schema";
import { EmailData } from "../types/auth";
import Link from "next/link";

interface ForgetPasswordFormProps {
  handleChangeEmail: (email: string) => void;
  handleNextStep: () => void;
}

export const ForgetPasswordForm = ({
  handleChangeEmail,
  handleNextStep,
}: ForgetPasswordFormProps) => {
  const { forgetPassword } = useAuthMutations();
  const { mutateAsync, data, isPending } = forgetPassword;

  const methods = useForm<EmailData>({
    resolver: zodResolver(emailSchema),
  });

  async function onSubmit(data: EmailData) {
    await mutateAsync(data);
    handleChangeEmail(data.email);
  }

  const disabledButton = isPending || !methods.formState.isValid;

  if (data?.message) {
    return (
      <>
        <p className="font-medium">{data.message}</p>
        <div className="space-y-4">
          <Link
            className="text-blue-400 hover:text-blue-500 w-full border inline-block text-center rounded-md py-1.5 px-3.5"
            href={`https://${data.domain}`}
            target="_blank"
          >
            <span>Перейти к почте</span>
          </Link>
          <Button
            className="w-full justify-center"
            variant="outline"
            onClick={handleNextStep}
            type="button"
          >
            <span>Ввести код</span>
          </Button>
        </div>
      </>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <FieldInput
            type="email"
            name="email"
            placeholder="Введите email"
            label="Email"
          />
          <div className="flex justify-end">
            <Button disabled={disabledButton} type="submit">
              {isPending ? (
                <Loader className="border-white w-5 h-5" />
              ) : (
                "Отправить код"
              )}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
