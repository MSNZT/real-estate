import { useState } from "react";
import {
  Map,
  ZoomControl,
  GeolocationControl,
  ObjectManager,
} from "@pbe/react-yandex-maps";

import { useMapAds } from "./useMapAds";

import { Ad } from "@/shared/config/apollo/generated/types";
import { useFeatures } from "./useFeatures";

import { useLocationData } from "@/entities/user/store/useLocationData";
import { BalloonMapAds } from "./BalloonMapAds";

export const YMapComponent = () => {
  const { latitude, longitude } = useLocationData();
  const [mapIsReady, setMapIsReady] = useState(false);
  const { mapRef, debouncedBoundsChange, features } = useMapAds(mapIsReady);
  const { getAdsByCoordinates } = useFeatures();
  const [open, setOpen] = useState(false);
  const [adList, setAdList] = useState<Ad[]>([]);

  const handleObjectClickk = async (id: string) => {
    const { data } = await getAdsByCoordinates({
      variables: {
        filters: {
          ids: [id],
        },
      },
      fetchPolicy: "no-cache",
    });

    setAdList(data?.getAllAds?.ads || []);
    if (data?.getAllAds?.ads.length) setOpen(true);
  };

  const handleClusterClick = async (id: string) => {
    const { data } = await getAdsByCoordinates({
      variables: {
        filters: {
          ids: [id],
        },
      },
      fetchPolicy: "no-cache",
    });

    setAdList(data?.getAllAds?.ads || []);
    if (data?.getAllAds?.ads.length) setOpen(true);
  };

  const handleObjectClick = async (e: ymaps.Event) => {
    const objectManager = e.get("target");
    const objectId = e.get("objectId");

    if (objectId.startsWith("__cluster__:")) {
      const objectFeatures =
        objectManager?._overlaysById[objectId]?._data?.features;
      const { data } = await getAdsByCoordinates({
        variables: {
          filters: {
            ids: objectFeatures.map((feature) => feature.id),
          },
        },
        fetchPolicy: "no-cache",
      });

      setAdList(data?.getAllAds.ads || []);
      if (data?.getAllAds?.ads.length) setOpen(true);
      return;
    }

    const { data } = await getAdsByCoordinates({
      variables: {
        filters: {
          ids: [objectId],
        },
      },
      fetchPolicy: "no-cache",
    });
    console.log("a;ododfo", data);

    setAdList(data?.getAllAds?.ads || []);
    if (data?.getAllAds?.ads.length) setOpen(true);
  };

  return (
    <div className="overflow-x-hidden">
      <Map
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        defaultState={{ center: [latitude, longitude], zoom: 13 }}
        onBoundsChange={debouncedBoundsChange}
        onLoad={() => setMapIsReady(true)}
        className="relative"
        defaultOptions={{
          suppressMapOpenBlock: true,
          yandexMapDisablePoiInteractivity: true,
        }}
      >
        {features.length > 0 && (
          <ObjectManager
            options={{
              clusterize: true,
              gridSize: 1,
            }}
            clusters={{
              preset: "islands#invertedDarkBlueClusterIcons",
              clusterDisableClickZoom: true,
              clusterBalloonItemClickAction: { type: "doNothing" },
              clusterOpenBalloonOnClick: false,
            }}
            instanceRef={(ref) => {
              if (ref) {
                ref.clusters.events.add("click", (e) => {
                  const cluster = e.get("target");
                  e.preventDefault();
                  e.stopPropagation();

                  console.log(cluster);

                  // Ваша логика обработки кластера
                  // handleClusterClick(cluster);
                });

                ref.objects.events.add("click", (e) => {
                  const objectId = e.get("objectId");
                  e.preventDefault();
                  e.stopPropagation();

                  // Ваша логика обработки объекта
                  handleObjectClickk(objectId);
                });
              }
            }}
            features={features}
            // onClick={handleObjectClick}
          />
        )}
        <BalloonMapAds adList={adList} open={open} setOpen={setOpen} />
        <ZoomControl />
        <GeolocationControl />
      </Map>
    </div>
  );
};
