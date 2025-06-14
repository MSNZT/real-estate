"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { tokenService } from "@/shared/services/token.service";
import { useSearchParams } from "next/navigation";
import { useAuthMutations } from "@/features/auth";

export const useAuthFromParams = () => {
  const searchParams = useSearchParams();
  const {
    getMe: { mutate },
  } = useAuthMutations();

  useEffect(() => {
    const accessToken = searchParams.get("token");

    if (accessToken) {
      tokenService.saveAccessToken(accessToken);
      mutate();
    }
  }, [searchParams]);
};
