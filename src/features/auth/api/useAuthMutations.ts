"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { authService } from "@/shared/services/auth.service";
import {
  AuthResponse,
  EmailData,
  ForgetPasswordResponse,
  LoginData,
  OAuthData,
  PasswordCodeData,
  RegisterFormValues,
  ResetPasswordData,
  StatusResponse,
} from "../types/auth";
import { tokenService } from "@/shared/services/token.service";
import { oauthService } from "@/shared/services/oauth.service";
import { useAuthContext } from "@/app/providers/AuthProvider";
import toast from "react-hot-toast";
import { User } from "@/entities/user";

type AxiosErrorResponse = AxiosError & {
  response: {
    data: {
      message: string;
      statusCode: number;
    };
  };
};

export const useAuthMutations = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setHasRefresh } = useAuthContext();

  const login = useMutation<AuthResponse, AxiosErrorResponse, LoginData>({
    mutationFn: (data) => authService.login(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      tokenService.saveAccessToken(data.token);
    },
  });

  const register = useMutation<
    AuthResponse,
    AxiosErrorResponse,
    Omit<RegisterFormValues, "confirmPassword">
  >({
    mutationFn: (data) => authService.register(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      tokenService.saveAccessToken(data.token);
    },
  });

  const getMe = useQuery<User, AxiosErrorResponse>({
    queryKey: ["auth", "me"],
    queryFn: () => authService.getMe(),
    enabled: false,
  });

  const logout = useMutation<boolean, AxiosErrorResponse>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      tokenService.removeAccessToken();
      queryClient.setQueryData(["auth", "me"], null);
      setHasRefresh(false);
      router.push("/");
    },
  });

  const forgetPassword = useMutation<
    ForgetPasswordResponse,
    AxiosErrorResponse,
    EmailData
  >({
    mutationFn: (data) => authService.forgetPassword(data),
  });

  const forgetPasswordCodeValidate = useMutation<
    StatusResponse,
    AxiosErrorResponse,
    PasswordCodeData
  >({
    mutationFn: (data) => authService.forgetPasswordValidate(data),
  });

  const changePassword = useMutation<
    any,
    AxiosErrorResponse,
    ResetPasswordData
  >({
    mutationFn: (data) => authService.changePassword(data),
  });

  const oauthValidate = useMutation<
    { status: string },
    AxiosErrorResponse,
    string
  >({
    mutationFn: (token) => oauthService.validate(token),
    onSuccess: (response) => {
      if (typeof response === "boolean" && !response) {
        router.push("/");
      }
    },
  });

  const registerOAuthComplete = useMutation<
    AuthResponse,
    AxiosErrorResponse,
    OAuthData
  >({
    mutationFn: ({ phone, token }) =>
      oauthService.registerComplete({ phone, token }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      tokenService.saveAccessToken(data.token);
      router.push("/");
    },
    onError: (data) => {
      if (data.response.data.statusCode === 401) {
        toast.error("Время авторизации истекло, войдите через сервис снова.", {
          duration: 3000,
        });
        router.push("/auth/login");
      }
      return data;
    },
  });

  return {
    login: {
      ...login,
      error: login.error?.response.data.message,
    },
    register: {
      ...register,
      error: register.error?.response.data.message,
    },
    logout,
    oauthValidate: {
      ...oauthValidate,
      error: oauthValidate.error?.response.data,
    },
    registerOAuthComplete: {
      ...registerOAuthComplete,
      error: registerOAuthComplete.error?.response.data.message,
    },
    forgetPassword,
    forgetPasswordCodeValidate: {
      ...forgetPasswordCodeValidate,
      error: forgetPasswordCodeValidate.error?.response.data,
    },
    changePassword,
    getMe,
  };
};
