"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { tokenService } from "@/shared/services/token.service";
import { useAuthData } from "../model/store/useAuthData";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/shared/services/auth.service";

export const useAuthFromParams = () => {
  const { setAuthData } = useAuthData();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      router.replace("/");

      authService
        .accounts()
        .then((data) => {
          setAuthData({ isAuth: !!data, userData: data });
          setTimeout(() => {
            toast.success("Вы успешно авторизовались", { duration: 2000 });
          }, 100);
          tokenService.saveAccessToken(accessToken);
        })
        .catch(() => setAuthData({ isAuth: false }))
        .finally(() => setAuthData({ isLoading: false }));
    }
  }, [searchParams, router, setAuthData]);
};
