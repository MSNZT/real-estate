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
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { formatAddress } from "../utils/formatAddress";
import { API_KEY_MAP } from "@/shared/config/environment";
import { AdFormData } from "../types/types";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { AddressDetails } from "@/shared/types/location";

import "./map.css";

type CoordArgsType = {
  latitude: number;
  longitude: number;
};

interface MapComponentProps {
  setAddressQuery: Dispatch<SetStateAction<string>>;
}

export const MapComponent = ({ setAddressQuery }: MapComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<ymaps.Map | null>(null);
  const { mutate } = useMutation<any, Error, CoordArgsType>({
    mutationFn: ({ latitude, longitude }) =>
      locationService.getAddressByCoords(latitude, longitude),
    onSuccess: handleSuccess,
  });
  const { setValue } = useFormContext<AdFormData>();
  const address = useWatch({ name: "location.address" });

  const handleMapLoad = () => {
    setIsLoading(false);
  };

  const handleMapClick = (e: ymaps.MapEvent) => {
    const coords = e.get("coords");
    mutate({ latitude: coords[0], longitude: coords[1] });
  };

  function handleSuccess(addressDetails: AddressDetails) {
    const { city, settlement, geo_lat, geo_lon, street, house } =
      addressDetails;

    const locality = city ? city : settlement;
    const address = formatAddress(street, house);

    setAddressQuery(address);

    setValue(
      "location",
      {
        city: locality ?? "",
        latitude: Number(geo_lat),
        longitude: Number(geo_lon),
        address,
      },
      { shouldDirty: true }
    );
  }

  return (
    <div>
      {isLoading && (
        <Skeleton className="w-full h-[300px] rounded-2xl shadow bg-gray-200" />
      )}
      <Controller
        name="location"
        render={({ field }) => (
          <div className="w-full h-[300px]">
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
                onActionEnd={(e) => console.log(e)}
                instanceRef={(map) => (mapRef.current = map)}
              >
                {address && (
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
                )}
                <ZoomControl />
                <GeolocationControl />
              </Map>
            </YMaps>
          </div>
        )}
      />
    </div>
  );
};
