"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../api/useAuth";
import { Button, FieldInput, Loader } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { codeSchema } from "../schema/schema";
import { CodeData } from "../types/auth";

interface ForgetPasswordCodeFormProps {
  handleChangeCode: (code: string) => void;
  handleNextStep: () => void;
  email: string;
}

export const ForgetPasswordCodeForm = ({
  handleChangeCode,
  handleNextStep,
  email,
}: ForgetPasswordCodeFormProps) => {
  const { forgetPasswordCodeValidate } = useAuth();
  const { mutateAsync, data, isPending, error } = forgetPasswordCodeValidate;

  console.log("code", error);

  const methods = useForm<CodeData>({
    resolver: zodResolver(codeSchema),
  });

  async function onSubmit(data: CodeData) {
    await mutateAsync({ code: data.code, email });
    handleChangeCode(data.code);
    handleNextStep();
  }

  const disabledButton = isPending || !methods.formState.isValid;

  if (data?.status === "success") {
    return (
      <>
        <div className="space-y-4">
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
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
        <div className="space-y-5">
          <FieldInput
            type="number"
            name="code"
            placeholder="123456"
            label="Код восстановления"
            className="placeholder:text-center text-center"
          />
          <div className="flex justify-end">
            <Button disabled={disabledButton} type="submit">
              {isPending ? (
                <Loader className="border-white w-5 h-5" />
              ) : (
                "Подтвердите код"
              )}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
