"use client";
import { useAuth } from "@/entities/user";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getFavorites } from "../api/getFavorites";
import { toggleFavorite } from "../api/toggleFavorite";

type FavoritesContextType = {
  favorites: string[] | null;
  hasInFavorites: (adId: string) => boolean;
  handleToggleFavorite: (adId: string) => void;
};

const defaultValue: FavoritesContextType = {
  favorites: null,
  hasInFavorites: () => false,
  handleToggleFavorite: () => {},
};

export const FavoritesContext =
  createContext<FavoritesContextType>(defaultValue);
const FAVORITES_STORAGE_KEY = "favorites";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[] | null>(null);
  const { isAuth } = useAuth();
  const { fetchFavorites } = getFavorites();
  const { toggleAdFavorite } = toggleFavorite();

  useEffect(() => {
    if (isAuth) {
      fetchFavorites().then(({ data }) => {
        const response = data?.getFavoriteAds.map(({ ad }) => ad.id);
        setFavorites(response || []);
      });
    } else {
      console.log("kek");
      const favoritesLS = JSON.parse(
        localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]"
      ) as string[];
      setFavorites(favoritesLS);
    }
  }, [isAuth, fetchFavorites]);

  const hasInFavorites = (adId: string) => {
    if (!favorites) return false;
    return favorites.includes(adId);
  };

  const handleToggleFavorite = (adId: string) => {
    if (!favorites) return;

    if (isAuth) {
      const data = toggleAdFavorite({
        variables: {
          id: adId,
        },
      });
      console.log("toggle", data);
    } else {
      const favoritesLS = JSON.parse(
        localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]"
      ) as string[];

      const newFavorites = favoritesLS.includes(adId)
        ? favoritesLS.filter((favorite) => favorite !== adId)
        : [...favoritesLS, adId];

      setFavorites(newFavorites);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, hasInFavorites, handleToggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
