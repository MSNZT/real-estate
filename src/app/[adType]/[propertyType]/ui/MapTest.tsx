"use client";
import { YMapLocation } from "@yandex/ymaps3-types/imperative/YMap";
import { useCallback, useMemo, useState } from "react";
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapZoomControl,
  YMapControls,
  YMapGeolocationControl,
  YMapMarker,
  YMapCustomClusterer,
  YMapDefaultMarker,
  YMapListener,
  YMapCollection,
  YMapControlButton,
  YMapContainer,
} from "ymap3-components";
import * as YMaps from "@yandex/ymaps3-types";
import { Feature } from "@yandex/ymaps3-types/packages/clusterer";
import { points } from "./points";

const location: YMapLocation = {
  center: [37.6156, 55.7522],
  zoom: 12,
};

export function Map() {
  // const [ads, setAds] = useState<YMaps.Feature[]>([]);
  // const [getAds, { data }] = useLazyQuery<Query>(GET_ALL_ADS, {
  //   fetchPolicy: "network-only",
  // });
  // const mapRef = useRef<YMaps.YMap>(null);
  // const prevBounds = useRef<YMaps.LngLatBounds>(null);

  // const parseBounds = (bounds: [[number, number], [number, number]]) => {
  //   const lats = [bounds[0][1], bounds[1][1]].sort((a, b) => a - b);
  //   const lons = [bounds[0][0], bounds[1][0]].sort((a, b) => a - b);

  //   return {
  //     latitudeRange: [lats[0], lats[1]] as [number, number],
  //     longitudeRange: [lons[0], lons[1]] as [number, number],
  //   };
  // };

  // console.log(prevBounds);

  // const handleBoundsChange = useCallback(async () => {
  //   try {
  //     if (!mapRef.current) return;
  //     const bounds = mapRef.current.bounds;

  //     if (JSON.stringify(bounds) === JSON.stringify(prevBounds.current)) return;
  //     prevBounds.current = bounds;

  //     const { latitudeRange, longitudeRange } = parseBounds(
  //       bounds as [[number, number], [number, number]]
  //     );

  //     const { data } = await getAds({
  //       variables: {
  //         filters: {
  //           location: {
  //             fields: {
  //               latitudeRange,
  //               longitudeRange,
  //             },
  //           },
  //         },
  //       },
  //     });

  //     const mappingAds =
  //       data?.getAllAds.map((ad) => ({
  //         type: "Feature",
  //         id: ad.id,
  //         geometry: {
  //           type: "Point",
  //           coordinates: [ad.location.longitude, ad.location.latitude],
  //         },
  //       })) || [];

  //     if (JSON.stringify(mappingAds) !== JSON.stringify(ads)) {
  //       setAds(mappingAds);
  //     }
  //   } catch (error) {
  //     console.error("Ошибка загрузки данных:", error);
  //   }
  // }, [getAds]);

  // const debouncedUpdateHandler = useDebounce(handleBoundsChange, 400);

  const marker = useCallback(
    (feature: Feature) => (
      <YMapDefaultMarker
        key={feature.id}
        coordinates={feature.geometry.coordinates}
      />
    ),
    []
  );

  const cluster = useCallback(
    (coordinates: YMaps.LngLat, features: Feature[]) => (
      <YMapMarker coordinates={coordinates}>
        <span
          style={{
            borderRadius: "50%",
            background: "var(--primary-color)",
            color: "white",
            width: 42,
            height: 42,
            outline: "solid 3px var(--primary-color)",
            outlineOffset: "3px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {features.length}
        </span>
      </YMapMarker>
    ),
    []
  );

  const rd = useMemo(() => [...points], [points]);

  return (
    // <YMap key="map" location={location}>
    //   <YMapDefaultSchemeLayer />
    //   <YMapDefaultFeaturesLayer />
    //   {/* <YMapDefaultMarker coordinates={location.center} /> */}
    //   <YMapControls position="bottom">
    //     <YMapZoomControl />
    //   </YMapControls>
    //   <YMapControls position="bottom left">
    //     <YMapGeolocationControl />
    //   </YMapControls>
    //   {/* <YMapListener onUpdate={debouncedUpdateHandler} /> */}
    //   {/* {ads.length > 0 && (
    //     <YMapCustomClusterer
    //       key={ads.length}
    //       marker={(feature) => {
    //         return (
    //           <YMapDefaultMarker
    //             key={feature.id}
    //             coordinates={feature.geometry.coordinates}
    //           />
    //         );
    //       }}
    //       cluster={(coordinates, features) => {
    //         return (
    //           <YMapMarker
    //             key={`cluster-${coordinates[0] - coordinates[1] - features.length}`}
    //             coordinates={coordinates}
    //           >
    //             <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full">
    //               {features.length}
    //             </div>
    //           </YMapMarker>
    //         );
    //       }}
    //       gridSize={64}
    //       features={ads}
    //     />
    //   )} */}
    //   {/* <YMapLayer source="clusterer-source" type="markers" zIndex={1800} /> */}
    //   <YMapCustomClusterer
    //     marker={marker}
    //     cluster={cluster}
    //     method={gridSizedMethod}
    //     features={points}
    //   />
    // </YMap>

    <YMap key="map" location={location} mode="vector" theme="dark">
      <YMapCustomClusterer
        marker={marker}
        cluster={cluster}
        gridSize={64}
        features={rd}
      />
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      {/* <YMapListener onUpdate={onUpdate} /> */}
      <YMapDefaultMarker coordinates={location.center} />
      <YMapControls position="bottom">
        <YMapZoomControl />
      </YMapControls>
      <YMapControls position="bottom left">
        <YMapGeolocationControl />
      </YMapControls>
      <YMapControls position="top">
        <YMapControlButton>
          <div className="map-custom-button">Custom zoom in</div>
        </YMapControlButton>
        <YMapControlButton>
          <div className="map-custom-button">Custom zoom out</div>
        </YMapControlButton>
      </YMapControls>
    </YMap>
  );
}
