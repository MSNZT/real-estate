"use client";

import { useEffect } from "react";
import { useAuthData } from "../store/useAuthData";
import { tokenService } from "@/shared/services/token.service";
import { authService } from "@/shared/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { AuthResponse } from "@/features/auth/types/auth";
import { AxiosError } from "axios";

export const useCheckAuth = () => {
  const { setAuthData } = useAuthData();

  const { data } = useQuery<any, AxiosError, AuthResponse>({
    queryKey: [],
    queryFn: async () => {
      try {
        setAuthData({ isLoading: true });
        return await authService.getMe();
      } finally {
        setAuthData({ isLoading: false });
      }
    },
    enabled: !!tokenService.getAccessToken(),
    retry: 0,
  });

  useEffect(() => {
    setAuthData({ isAuth: !!data, userData: data?.user });
  }, [data]);
};
