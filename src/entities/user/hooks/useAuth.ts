"use client";
import { useIsMounted } from "@/shared/lib/useIsMounted";
import { authService } from "@/shared/services/auth.service";
import { tokenService } from "@/shared/services/token.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const isMounted = useIsMounted();
  const hasToken = isMounted && !!tokenService.getAccessToken();

  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: () => authService.getMe(),
    enabled: hasToken,
    retry: false,
    // initialData: () => {
    //   // Попробуем получить данные из кэша при инициализации
    //   return queryClient.getQueryData(["auth"]) || null;
    // },
  });

  console.log("test", {
    isMounted: !isMounted,
    hasToken: hasToken,
    isLoading: isLoading,
  });
  return {
    user,
    isLoading: !isMounted || (hasToken && isLoading),
    isAuth: hasToken && isSuccess,
    isError,
    isSuccess,
  };
};
