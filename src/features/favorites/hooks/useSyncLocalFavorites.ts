"use client";
import { useAuth } from "@/entities/user";
import { SYNC_FAVORITES } from "@/shared/config/apollo/requests/syncFavorites";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

export const useSyncLocalFavorites = () => {
  const [ids, setIds] = useState<string[]>([]);
  const { isAuth } = useAuth();

  const [syncFavorites] = useMutation(SYNC_FAVORITES, {
    variables: {
      ids,
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && isAuth) {
      setIds(JSON.parse(localStorage.getItem("favorites") ?? "[]"));
    }
  }, [isAuth]);

  useEffect(() => {
    if (ids.length && isAuth) {
      syncFavorites();
      localStorage.removeItem("favorites");
    }
  }, [ids, isAuth]);
};
