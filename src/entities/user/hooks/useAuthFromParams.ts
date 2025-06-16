"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { tokenService } from "@/shared/services/token.service";
import { useAuthMutations } from "@/features/auth";

export const useAuthFromParams = () => {
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const { getMe, logout } = useAuthMutations();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      tokenService.saveAccessToken(token);
      getMe
        .refetch()
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
          tokenService.saveAccessToken(token);
          router.replace("/moscow");
          toast.success("Вы успешно авторизовались", {
            duration: 3000,
          });
        })
        .catch(() => {
          logout.mutate();
        });
    }
  }, []);
};
