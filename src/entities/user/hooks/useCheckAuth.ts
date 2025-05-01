"use client";

import { useEffect } from "react";
import { useAuthData } from "../model/store/useAuthData";
import { tokenService } from "@/shared/services/token.service";
import { authService } from "@/shared/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useCheckAuth = () => {
  const { setAuthData } = useAuthData();

  const { data, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => authService.accounts(),
    enabled: !!tokenService.getAccessToken(),
    retry: 0,
  });

  useEffect(() => {
    setAuthData({ isLoading: isLoading, isAuth: !!data, userData: data });
  }, [data, isLoading]);
};
