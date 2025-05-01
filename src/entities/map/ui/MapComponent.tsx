import React, { memo, useEffect, useState } from "react";
import { Map, Marker, YMap } from "@/shared/lib/ymap";
import ymaps from "yandex-maps";
import { cn } from "@/shared/lib/utils";
import { useLazyQuery, useSuspenseQuery } from "@apollo/client";
import { GET_ALL_ADS } from "@/shared/config/apollo/requests/getAllAds";
import { Ad, Query } from "@/shared/config/apollo/generated/types";
import { useMap } from "@/shared/lib/ymap/ui/YMap";

interface MapComponentProps {
  center: number[];
  zoom: number;
  onClick?: (e: ymaps.Event<MouseEvent>) => void;
  className?: string;
  width?: string;
  height?: string;
}

export const MapComponent = memo(
  ({
    center,
    onClick,
    zoom,
    className,
    width = "100%",
    height = "300px",
  }: MapComponentProps) => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [getAds, { data }] = useLazyQuery<Query>(GET_ALL_ADS, {
      fetchPolicy: "network-only",
    });

    const handleBoundsChange = async (
      bounds: [[number, number], [number, number]]
    ) => {
      try {
        const { data } = await getAds({
          variables: {
            filters: {
              location: {
                fields: {
                  latitudeRange: [bounds[0][0], bounds[1][0]],
                  longitudeRange: [bounds[0][1], bounds[1][1]],
                },
              },
            },
          },
        });

        // Обновляем объявления
        // Очищаем предыдущие объявления перед установкой новых
        setAds((prev) => {
          const newAds = data?.getAllAds || [];
          // Фильтруем дубликаты по ID
          return [...prev, ...newAds].filter(
            (ad, index, self) => self.findIndex((a) => a.id === ad.id) === index
          );
        });
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <YMap apiKey="551d826c-1a13-4de5-9eba-b5ac8eecaa4b">
        <Map
          onBoundsChange={handleBoundsChange}
          onClick={onClick}
          state={{
            center: [55.751574, 37.617635],
            zoom: 12,
            bounds: [
              [55.74, 37.6],
              [55.76, 37.63],
            ],
          }}
          styles={{ width, height }}
          className={cn("shadow rounded-lg overflow-x-hidden", className)}
        >
          {ads?.map((ad, i) => {
            const { location, deal } = ad;
            return (
              <Marker
                key={i}
                coordinates={[location.latitude, location.longitude]}
                options={{
                  iconLayout: "default#image",
                  iconImageHref: "/marker.svg",
                  iconImageSize: [40, 40],
                  iconImageOffset: [-20, -40],
                }}
                balloonContent={`<div class="custom-balloon">
              <h3 class="text-lg font-bold">${ad.adType}</h3>
              <p class="text-gray-600">${deal.price}</p>
              </div>
            `}
              />
            );
          })}
        </Map>
      </YMap>
    );
  }
);
