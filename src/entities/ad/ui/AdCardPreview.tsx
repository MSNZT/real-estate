import Link from "next/link";
import { Ad } from "@/shared/config/apollo/generated/types";
import { AdCardTitle } from "./segments/AdCardTitle";
import { AdCardLocation } from "./segments/AdCardLocation";
import { AdCardPrice } from "./segments/AdCardPrice";
import { AdCardImage } from "./segments/AdCardImage";
import { Heart } from "lucide-react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface AdCardPreviewProps {
  item: Ad;
  price: string;
  period: string;
  onToggleFavorite?: (id: string) => void;
  hasInFavorite?: (ad: Ad) => boolean;
  showFavorite?: boolean;
}

export const AdCardPreview = ({
  item,
  price,
  period,
  onToggleFavorite,
  hasInFavorite,
  showFavorite,
}: AdCardPreviewProps) => {
  return (
    <div className="flex flex-col shrink-0 w-full">
      <Link href={`/offer/${item.id}`}>
        <AdCardImage mainPhoto={item.mainPhoto} />
      </Link>
      <div>
        <div className="flex items-center justify-between">
          <Link href={`/ads/${item.id}`}>
            <AdCardTitle title={item.title} />
          </Link>
          {showFavorite && (
            <Button
              variant="clear"
              size="clear"
              className="group cursor-pointer transition-colors duration-300"
              onClick={() => onToggleFavorite?.(item.id)}
            >
              <Heart
                className={cn(
                  "group-hover:stroke-red-700 group-hover:fill-red-500",
                  {
                    "stroke-red-700 fill-red-500": hasInFavorite?.(item),
                  }
                )}
              />
            </Button>
          )}
        </div>
        <AdCardLocation location={item.location} />
      </div>
      <AdCardPrice price={price} period={period} />
    </div>
  );
};
