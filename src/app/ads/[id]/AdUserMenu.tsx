"use client";
import { Button } from "@/shared/ui";
import { Heart, Share2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export const AdUserMenu = ({ title, id }: { title: string; id: string }) => {
  const [hasInFavorite, setHasInFavorite] = useState(false);

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites !== null) {
      const favoritesArr = JSON.parse(favorites);
      setHasInFavorite(favoritesArr.includes(id));
    }
  }, []);

  const handleClickShareButton = useCallback(() => {
    navigator.share({
      url: window.location.href,
      title: `Объявление - ${title}`,
    });
  }, [id]);

  const addToFavorite = useCallback(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") ?? "") || [];
    const newFavorites = favorites.includes(id)
      ? JSON.stringify(favorites.filter((favorite) => favorite !== id))
      : JSON.stringify([...favorites, id]);
    setHasInFavorite((prev) => !prev);
    localStorage.setItem("favorites", newFavorites);
  }, [id]);

  return (
    <ul className="flex items-center gap-2">
      <li className="bg-[#f2efe9] hover:bg-[#ede8df] transition-colors rounded-lg px-3 py-1">
        <Button
          className="flex items-center gap-1"
          variant="ghost"
          size="clear"
          onClick={addToFavorite}
        >
          <Heart size={16} />
          <span className="text-sm font-medium">
            {hasInFavorite ? "Добавлено в избранное" : "Добавить в избранное"}
          </span>
        </Button>
      </li>
      <li className="lg:hidden bg-[#f2efe9] hover:bg-[#ede8df] transition-colors rounded-lg px-3 py-1">
        <Button
          className="flex items-center gap-1"
          variant="ghost"
          size="clear"
          onClick={handleClickShareButton}
        >
          <Share2 size={16} />
          <span className="text-sm font-medium">Поделиться</span>
        </Button>
      </li>
    </ul>
  );
};
