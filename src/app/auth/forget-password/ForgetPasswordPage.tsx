"use client";
import { AuthLayout, ForgetPasswordForm } from "@/features/auth";
import { ForgetPasswordCodeForm } from "@/features/auth/ui/ForgetPasswordCodeForm";
import { NewPasswordForm } from "@/features/auth/ui/NewPasswordForm";
import { useState } from "react";

export const ForgetPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  function handleChangeEmail(email: string) {
    setEmail(email);
  }

  function handleChangeCode(code: string) {
    setCode(code);
  }

  return (
    <AuthLayout title="Восстановление пароля" isSocial={false}>
      {currentStep === "email" && (
        <ForgetPasswordForm
          handleNextStep={() => setCurrentStep("code")}
          handleChangeEmail={handleChangeEmail}
        />
      )}
      {currentStep === "code" && (
        <ForgetPasswordCodeForm
          handleNextStep={() => setCurrentStep("new-password")}
          handleChangeCode={handleChangeCode}
          email={email}
        />
      )}
      {currentStep === "new-password" && (
        <NewPasswordForm email={email} code={code} />
      )}
    </AuthLayout>
  );
};
