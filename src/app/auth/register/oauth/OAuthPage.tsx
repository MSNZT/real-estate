"use client";
import { AuthLayout, RegisterOAuthForm, useAuth } from "@/features/auth";
import { Container, Loader } from "@/shared/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export const OAuthPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useSearchParams();
  const router = useRouter();
  const tokenRef = useRef<string>(null);

  const {
    oauthValidate: { mutate, data, error },
  } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    tokenRef.current = token;
    if (token) {
      mutate(token);
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (data?.status === "success") {
      setIsLoading(false);
    }
    console.log(error);

    if (error?.statusCode === 401) {
      toast.error("Время авторизации истекло, войдите через сервис снова.", {
        duration: 3000,
      });
      setIsLoading(false);
      router.push("/auth/login");
    }
  }, [data, error]);

  if (isLoading) {
    return (
      <Container className="flex justify-center items-center h-[calc(100vh-81px)]">
        <Loader />
      </Container>
    );
  }

  return (
    <AuthLayout title="Завершение регистрации" isSocial={false}>
      <RegisterOAuthForm token={tokenRef.current!} />
    </AuthLayout>
  );
};
