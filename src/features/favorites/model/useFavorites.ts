"use client";
import { use } from "react";
import { FavoritesContext } from "./context";

export const useFavorites = () => {
  const favorites = use(FavoritesContext);
  if (!favorites) throw new Error("Необходимо обернуть в favorites provider");
  return favorites;
};
