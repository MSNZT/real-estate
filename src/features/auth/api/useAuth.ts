"use client";
import { authService } from "@/shared/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { LoginData, RegisterData } from "../types/auth";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuthData, User } from "@/entities/user";

type AxiosErrorResponse = AxiosError & {
  response: {
    data: {
      errors: {
        message: string;
      };
    };
  };
};

export const useAuth = () => {
  const { setAuthData, clearAuthData } = useAuthData();
  const router = useRouter();

  const login = useMutation<User, AxiosErrorResponse, LoginData>({
    mutationFn: (data) => authService.login(data),
    onSuccess: (data) => {
      setAuthData({ isAuth: !!data, isLoading: false, userData: data });
      router.push("/");
    },
    onError: () => {
      clearAuthData();
    },
  });

  const register = useMutation<User, AxiosErrorResponse, RegisterData>({
    mutationFn: (data) => authService.register(data),
    onSuccess: (data) => {
      setAuthData({ isAuth: !!data, isLoading: false, userData: data });
      router.push("/");
    },
    onError: () => {
      clearAuthData();
    },
  });

  const logout = useMutation<boolean, AxiosErrorResponse>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuthData();
      router.push("/");
    },
  });

  return {
    login,
    register,
    logout,
  };
};
