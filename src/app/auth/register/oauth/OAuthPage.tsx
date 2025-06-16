"use client";
import { AuthLayout, RegisterOAuthForm } from "@/features/auth";
import { OAuthValidateGate } from "./OAuthValidateGate";
import { useSearchParams } from "next/navigation";

export const OAuthPage = () => {
  const params = useSearchParams();
  const token = params.get("token");

  return (
    <OAuthValidateGate>
      <AuthLayout title="Завершение регистрации" isSocial={false}>
        <RegisterOAuthForm token={token!} />
      </AuthLayout>
    </OAuthValidateGate>
  );
};
