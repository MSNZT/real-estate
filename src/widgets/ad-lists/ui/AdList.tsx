"use client";
import { useInView } from "react-intersection-observer";
import { AdCardPreview, AdTypes, PropertyTypes } from "@/entities/ad";
import { getAdTitle } from "@/entities/ad/utils/getAdTitle";
import { getDealPeriod } from "@/entities/ad/utils/getDealPeriod";
import { getPrettyPrice } from "@/entities/ad/utils/getPrettyPrice";
import { Container } from "@/shared/ui";
import { useAds } from "../api/useAds";

interface AdListProps {
  adType: AdTypes;
  propertyType: PropertyTypes;
}

export const AdList = ({ adType, propertyType }: AdListProps) => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const { data, isLoading, error } = useAds(adType, propertyType, inView);

  if (error) return <p>Ошибка при загрузке объявлений</p>;

  return (
    <Container>
      <div className="grid grid-cols-4 gap-5">
        {data?.map((item) => (
          <AdCardPreview
            key={item.id}
            item={item}
            title={getAdTitle(item)}
            price={getPrettyPrice(item.deal.price)}
            period={getDealPeriod(item)}
          />
        ))}
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="h-64 bg-gray-100 animate-pulse rounded-lg"
              />
            ))}
        <div ref={ref} className="bg-transparent h-4"></div>
      </div>
    </Container>
  );
};
