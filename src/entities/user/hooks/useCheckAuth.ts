"use client";

import { useEffect } from "react";
import { useAuthData } from "../store/useAuthData";
import { tokenService } from "@/shared/services/token.service";
import { authService } from "@/shared/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { AuthResponse } from "@/features/auth/types/auth";
import { AxiosError } from "axios";

export const useCheckAuth = () => {
  // const { setAuthData } = useAuthData();
  // const { data } = useQuery<any, AxiosError, AuthResponse>({
  //   queryKey: [],
  //   queryFn: async () => {
  //     setAuthData({ isLoading: true });
  //     return await authService.getMe();
  //   },
  //   enabled: !!tokenService.getAccessToken(),
  //   retry: 0,
  // });
  // useEffect(() => {
  //   if (!!data) {
  //     setAuthData({
  //       isAuth: true,
  //       userData: data?.user,
  //       isLoading: false,
  //       isInitialized: true,
  //     });
  //   }
  // }, [data]);
};
