import { useLocationData } from "@/entities/user/store/useLocationData";
import { locationService } from "@/shared/services/location.service";
import { AddressResponseType } from "@/shared/types/location";
import { Skeleton } from "@/shared/ui";
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  GeolocationControl,
} from "@pbe/react-yandex-maps";
import { useMutation } from "@tanstack/react-query";
import { RefObject, useRef, useState } from "react";
import { formatAddress } from "../utils/formatAddress";

type CoordArgsType = {
  latitude: number;
  longitude: number;
};

export const MapComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState<number[]>([]);
  const { locationData, setData } = useLocationData();
  const center = [locationData.latitude, locationData.longitude];
  const mapRef = useRef<ymaps.Map | null>(null);
  const { mutate } = useMutation<any, Error, CoordArgsType>({
    mutationFn: ({ latitude, longitude }) =>
      locationService.getAddressByCoords(latitude, longitude),
    onSuccess: handleSuccess,
  });

  const handleMapLoad = () => {
    setIsLoading(false);
  };

  const handleMapClick = (e: ymaps.MapEvent) => {
    const coords = e.get("coords");
    mutate({ latitude: coords[0], longitude: coords[1] });
  };

  function handleSuccess({ suggestions }: AddressResponseType) {
    const {
      city,
      settlement_with_type,
      geo_lat,
      geo_lon,
      street_with_type,
      house,
    } = suggestions[0].data;

    const geoCoords = [Number(geo_lat), Number(geo_lon)];

    const settlement = city ? city : settlement_with_type;
    const address = formatAddress(street_with_type, house);
    // mapRef.current?.setCenter(geoCoords);
    setCoords(geoCoords);
    // const locationData = {
    //   city: settlement,
    //   address: address || null,
    //   latitude: Number(geo_lat),
    //   longitude: Number(geo_lon),
    // };

    // setData(locationData);
  }

  return (
    <div>
      {isLoading && (
        <Skeleton className="w-full h-[300px] rounded-2xl shadow bg-gray-200" />
      )}
      <YMaps query={{ apikey: process.env.API_KEY_MAP }}>
        <Map
          style={{
            width: "100%",
            height: "300px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
          }}
          defaultState={{ zoom: 14, center }}
          onLoad={handleMapLoad}
          onClick={handleMapClick}
          instanceRef={(map) => (mapRef.current = map)}
        >
          <Placemark
            geometry={coords}
            options={{
              iconLayout: "default#image",
              iconImageHref: "/pin.svg",
              iconImageSize: [40, 40],
              // iconImageOffset: [-15, -40],
            }}
            properties={{
              hintContent: "Кастомный маркер",
              balloonContent: "Описание маркера",
            }}
          />
          <ZoomControl />
          <GeolocationControl />
        </Map>
      </YMaps>
    </div>
  );
};
