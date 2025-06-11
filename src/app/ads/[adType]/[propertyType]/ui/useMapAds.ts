import { useCallback, useEffect, useRef, useState } from "react";
import ymaps from "yandex-maps";
import {
  Query,
  QueryGetAllAdsArgs,
} from "@/shared/config/apollo/generated/types";
import { GET_ALL_ADS_BY_COORDINATES } from "@/shared/config/apollo/requests/getAllAdsByCoordinates";
import { useDebounce } from "@/shared/lib/useDebounce";
import { useLazyQuery } from "@apollo/client";

type BoundsChangeEvent = ymaps.Event & {
  originalEvent: {
    newBounds: number[][];
  };
};

type Feature = {
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
};

export function useMapAds(mapIsReady: boolean) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const mapRef = useRef<any>(null);

  const [getAds] = useLazyQuery<Query, QueryGetAllAdsArgs>(
    GET_ALL_ADS_BY_COORDINATES,
    {
      fetchPolicy: "network-only",
    }
  );

  const updateBounds = useCallback(() => {
    if (!mapRef.current) return;

    const currentBounds = mapRef.current.instance.getBounds() as number[][];
    getData(currentBounds);
  }, []);

  useEffect(() => {
    if (mapRef.current) updateBounds();
  }, [mapIsReady]);

  async function getData(bounds: number[][]) {
    try {
      const lats = [bounds[0][0], bounds[1][0]];
      const lons = [bounds[0][1], bounds[1][1]];

      const { data } = await getAds({
        variables: {
          filters: {
            location: {
              fields: {
                latitudeRange: lats,
                longitudeRange: lons,
              },
            },
          },
        },
        fetchPolicy: "no-cache",
      });

      const features =
        data?.getAllAds.ads.map((ad) => ({
          id: ad.id,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [ad.location.latitude, ad.location.longitude],
          },
        })) || [];

      setFeatures(features);

      console.log(data);
    } catch (error) {}
  }

  const handleBoundsChange = useCallback((e: BoundsChangeEvent) => {
    const bounds = e.originalEvent.newBounds;
    getData(bounds);
  }, []);

  const debouncedBoundsChange = useDebounce(handleBoundsChange, 500);

  return {
    debouncedBoundsChange,
    features,
    mapRef,
  };
}
