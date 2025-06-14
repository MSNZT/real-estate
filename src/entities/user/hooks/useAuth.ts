"use client";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/app/providers/AuthProvider";
import { authService } from "@/shared/services/auth.service";
import { tokenService } from "@/shared/services/token.service";

export const useAuth = () => {
  const { hasRefresh } = useAuthContext();
  const hasAccess = !!tokenService.getAccessToken();
  const shouldQuery = hasRefresh || hasAccess;

  const {
    data: user,
    isLoading: queryLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.getMe,
    enabled: shouldQuery,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const isLoading = shouldQuery && queryLoading;
  const isAuth = !!user;
  const isGuest = !shouldQuery || (!isLoading && !user && isError);

  return {
    user,
    isLoading,
    isAuth,
    isGuest,
    isError,
    isSuccess,
  };
};
