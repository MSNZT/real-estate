import { AdCardPreview } from "@/entities/ad";
import { getDealPeriod } from "@/entities/ad/utils/getDealPeriod";
import { Ad } from "@/shared/config/apollo/generated/types";
import { getPrettyPrice } from "@/shared/utils/getPrettyPrice";

interface AdListsProps {
  data: Ad[];
}

export const AdListsPreview = ({ data }: AdListsProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-4 px-4 sm:px-0 no-scrollbar sm:grid sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {data.map((item) => (
        <div className="min-w-[250px] sm:w-full snap-start" key={item.id}>
          <AdCardPreview
            item={item}
            price={getPrettyPrice(item.deal.price)}
            period={getDealPeriod(item)}
          />
        </div>
      ))}
    </div>
  );
};
