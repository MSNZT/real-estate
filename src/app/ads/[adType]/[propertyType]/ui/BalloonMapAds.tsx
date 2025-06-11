import { AdCardPreview } from "@/entities/ad";
import { getDealPeriod } from "@/entities/ad/utils/getDealPeriod";
import { getPrettyPrice } from "@/entities/ad/utils/getPrettyPrice";
import { Ad } from "@/shared/config/apollo/generated/types";
import { cn } from "@/shared/lib/utils";
import { ArrowRight } from "lucide-react";

interface BalloonMapAdsProps {
  setOpen: (value: boolean) => void;
  open: boolean;
  adList: Ad[];
}

export const BalloonMapAds = ({
  adList,
  open,
  setOpen,
}: BalloonMapAdsProps) => {
  if (!open && !adList.length) return null;

  return (
    <div
      className={cn(
        "sr-only translate-x-[300px] absolute flex flex-col gap-4 transition-transform duration-500 top-0 right-0 bottom-0 z-10 bg-white shadow-md rounded-lg p-4 overflow-auto",
        {
          "-translate-x-0 not-sr-only": open,
        }
      )}
    >
      <button onClick={() => setOpen(false)}>
        <ArrowRight size={15} />
      </button>
      {adList?.map((ad) => (
        <AdCardPreview
          key={"ad" + ad.id}
          item={ad}
          price={getPrettyPrice(ad.deal.price)}
          period={getDealPeriod(ad)}
        />
      ))}
    </div>
  );
};
