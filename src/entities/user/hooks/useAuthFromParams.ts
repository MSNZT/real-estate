"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { tokenService } from "@/shared/services/token.service";
import { useAuthData } from "../store/useAuthData";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/features/auth";

export const useAuthFromParams = () => {
  const { setAuthData } = useAuthData();
  const searchParams = useSearchParams();
  const {
    getMe: { mutate },
  } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("token");

    if (accessToken) {
      tokenService.saveAccessToken(accessToken);
      mutate();
    }
  }, [searchParams, setAuthData]);
};
