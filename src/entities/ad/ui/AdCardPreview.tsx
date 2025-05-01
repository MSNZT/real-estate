import Link from "next/link";
import { Ad } from "@/shared/config/apollo/generated/types";
import { AdCardTitle } from "./segments/AdCardTitle";
import { AdCardLocation } from "./segments/AdCardLocation";
import { AdCardPrice } from "./segments/AdCardPrice";
import { AdCardImage } from "./segments/AdCardImage";

interface AdCardPreviewProps {
  item: Ad;
  title: string;
  price: string;
  period: string;
}

export const AdCardPreview = ({
  item,
  title,
  price,
  period,
}: AdCardPreviewProps) => {
  return (
    <div className="flex flex-col shrink-0 w-full">
      <Link href={`/ads/${item.id}`}>
        <AdCardImage mainPhoto={item.mainPhoto} />
      </Link>
      <div>
        <Link href={`/ads/${item.id}`}>
          <AdCardTitle title={title} />
        </Link>
        <AdCardLocation location={item.location} />
      </div>
      <AdCardPrice price={price} period={period} />
    </div>
  );
};
