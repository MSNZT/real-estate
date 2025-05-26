"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../api/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSchema } from "../schema/schema";
import { PhoneData } from "../types/auth";
import { PhoneInputField } from "./PhoneInputField";
import { Button } from "@/shared/ui";
import toast from "react-hot-toast";

export const RegisterOAuthForm = ({ token }: { token: string }) => {
  const methods = useForm<PhoneData>({ resolver: zodResolver(phoneSchema) });
  const { registerOAuthComplete } = useAuth();
  const { mutateAsync, isPending, error } = registerOAuthComplete;

  async function onSubmit(data: PhoneData) {
    try {
      await mutateAsync({ phone: data.phone.replace(/\D/g, ""), token });
      toast.success("Регистрация успешно завершена", { duration: 2000 });
    } catch (error) {
      toast.error("Не удалось завершить регистрацию", { duration: 2000 });
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {error && <p>{error}</p>}
        <PhoneInputField label="Телефон" name="phone" />
        <Button
          disabled={isPending}
          type="submit"
          className="justify-center mt-5 mb-5 w-full"
        >
          <span className="text-white">Зарегистрироваться</span>
        </Button>
      </form>
    </FormProvider>
  );
};
