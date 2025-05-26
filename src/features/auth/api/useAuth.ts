"use client";
import { authService } from "@/shared/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import {
  AuthResponse,
  EmailData,
  ForgetPasswordResponse,
  LoginData,
  OAuthData,
  PasswordCodeData,
  RegisterData,
  ResetPasswordData,
  StatusResponse,
} from "../types/auth";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuthData, User } from "@/entities/user";
import { tokenService } from "@/shared/services/token.service";

type AxiosErrorResponse = AxiosError & {
  response: {
    data: {
      message: string;
      statusCode: number;
    };
  };
};

export const useAuth = () => {
  const { setAuthData, clearAuthData } = useAuthData();
  const router = useRouter();

  const login = useMutation<AuthResponse, AxiosErrorResponse, LoginData>({
    mutationFn: (data) => authService.login(data),
    onSuccess: (data) => {
      setAuthData({ isAuth: !!data, isLoading: false, userData: data.user });
      tokenService.saveAccessToken(data.token);
      router.push("/");
    },
    onError: () => {
      clearAuthData();
    },
  });

  const register = useMutation<AuthResponse, AxiosErrorResponse, RegisterData>({
    mutationFn: (data) => authService.register(data),
    onSuccess: (data) => {
      setAuthData({ isAuth: !!data, isLoading: false, userData: data.user });
      tokenService.saveAccessToken(data.token);
      router.push("/");
    },
    onError: () => {
      clearAuthData();
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

  const logout = useMutation<boolean, AxiosErrorResponse>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuthData();
      tokenService.removeAccessToken();
      router.push("/");
    },
  });

  const getMe = useMutation<AuthResponse, AxiosErrorResponse>({
    mutationFn: () => authService.getMe(),
    onSuccess: (data) => {
      setAuthData({ isAuth: !!data, userData: data.user });
      router.push("/");
    },
  });

  const oauthValidate = useMutation<
    { status: string },
    AxiosErrorResponse,
    string
  >({
    mutationFn: (token) => authService.oauthValidate(token),
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
      authService.registerComplete({ phone, token }),
    onSuccess: (data) => {
      console.log(data);
      setAuthData({ isAuth: !!data, isLoading: false, userData: data.user });
      tokenService.saveAccessToken(data.token);
      router.push("/");
    },
    onError: () => {
      clearAuthData();
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
    getMe,
    forgetPassword,
    forgetPasswordCodeValidate: {
      ...forgetPasswordCodeValidate,
      error: forgetPasswordCodeValidate.error?.response.data,
    },
    changePassword,
  };
};
