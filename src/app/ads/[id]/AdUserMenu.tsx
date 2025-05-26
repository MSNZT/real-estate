"use client";
import { Button } from "@/shared/ui";
import { Heart, Share2 } from "lucide-react";
import { useCallback } from "react";

export const AdUserMenu = ({ title }: { title: string }) => {
  const handleClickShareButton = useCallback(() => {
    navigator.share({
      url: window.location.href,
      title: `Объявление - ${title}`,
    });
  }, []);

  return (
    <div className="sticky top-0 right-0">
      <ul className="flex items-center gap-2">
        <li className="bg-[#f2efe9] hover:bg-[#ede8df] transition-colors rounded-lg px-3 py-1">
          <Button
            className="flex items-center gap-1"
            variant="ghost"
            size="clear"
          >
            <Heart size={16} />
            <span className="text-sm font-medium">Добавить в избранное</span>
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
    </div>
  );
};
