import { useFavorites } from "@/features/favorites";
import { useIsMounted } from "@/shared/lib/useIsMounted";
import { Button, Skeleton } from "@/shared/ui";
import { Heart, Share2 } from "lucide-react";
import { useCallback } from "react";

export const AdUserMenu = ({ title, id }: { title: string; id: string }) => {
  const { handleToggleFavorite, hasInFavorites } = useFavorites();
  const isMounted = useIsMounted();

  const handleClickShareButton = useCallback(() => {
    navigator.share({
      url: window.location.href,
      title: `Объявление - ${title}`,
    });
  }, [id]);

  return (
    <ul className="flex items-center gap-2">
      <li className="bg-[#f2efe9] hover:bg-[#ede8df] transition-colors rounded-lg px-3 py-1">
        {isMounted ? (
          <Button
            className="flex items-center gap-1"
            variant="ghost"
            size="clear"
            onClick={() => handleToggleFavorite(id)}
          >
            <Heart size={16} />
            <span className="text-sm font-medium">
              {hasInFavorites(id)
                ? "Добавлено в избранное"
                : "Добавить в избранное"}
            </span>
          </Button>
        ) : (
          <Skeleton className="rounded-lg w-[180px] h-5" />
        )}
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
