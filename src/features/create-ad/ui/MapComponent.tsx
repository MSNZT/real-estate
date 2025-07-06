import { locationService } from "@/shared/services/location.service";
import { Skeleton } from "@/shared/ui";
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  GeolocationControl,
} from "@pbe/react-yandex-maps";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { formatAddress } from "../utils/formatAddress";
import { API_KEY_MAP } from "@/shared/config/environment";
import { AdFormData } from "../types/types";
import { Controller, useFormContext } from "react-hook-form";
import { AddressDetails } from "@/shared/types/location";

import "./map.css";

type CoordArgsType = {
  latitude: number;
  longitude: number;
};

export const MapComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<ymaps.Map | null>(null);
  const { mutate } = useMutation<any, Error, CoordArgsType>({
    mutationFn: ({ latitude, longitude }) =>
      locationService.getAddressByCoords(latitude, longitude),
    onSuccess: handleSuccess,
  });
  const { reset } = useFormContext<AdFormData>();

  const handleMapLoad = () => {
    setIsLoading(false);
  };

  const handleMapClick = (e: ymaps.MapEvent) => {
    const coords = e.get("coords");
    mutate({ latitude: coords[0], longitude: coords[1] });
  };

  function handleSuccess(addressDetails: AddressDetails) {
    console.log("проверка связи");
    const { city, settlement, geo_lat, geo_lon, street, house } =
      addressDetails;

    const locality = city ? city : settlement;
    const address = formatAddress(street, house);
    const locationData = {
      city: locality ?? "",
      address: address || "",
      latitude: Number(geo_lat),
      longitude: Number(geo_lon),
    };
    reset({ location: locationData });
  }

  return (
    <div>
      {isLoading && (
        <Skeleton className="w-full h-[300px] rounded-2xl shadow bg-gray-200" />
      )}
      <Controller
        render={({ field }) => (
          <YMaps query={{ apikey: API_KEY_MAP }}>
            <Map
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
              }}
              state={{
                zoom: 14,
                center: [field.value.latitude, field.value.longitude],
              }}
              onLoad={handleMapLoad}
              onClick={handleMapClick}
              instanceRef={(map) => (mapRef.current = map)}
            >
              <Placemark
                geometry={[field.value.latitude, field.value.longitude]}
                options={{
                  iconLayout: "default#image",
                  iconImageHref: "/pin.svg",
                  iconImageSize: [40, 40],
                  iconImageOffset: [-20, -40],
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
        )}
        name="location"
      />
    </div>
  );
};
