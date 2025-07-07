import { locationService } from "@/shared/services/location.service";
import { Skeleton } from "@/shared/ui";
import {
  YMaps,
  Map,
  ZoomControl,
  GeolocationControl,
} from "@pbe/react-yandex-maps";
import { useMutation } from "@tanstack/react-query";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { API_KEY_MAP } from "@/shared/config/environment";
import { Controller, useController, useFormContext } from "react-hook-form";
import { AddressDetails } from "@/shared/types/location";

import "../map.css";
import { AdFormData } from "../../types/types";
import { formatAddress } from "../../utils/formatAddress";
import { useDebouncedCallback } from "@/shared/lib/useDebouncedCallback";

type CoordArgsType = {
  latitude: number;
  longitude: number;
};

interface MapMobileProps {
  setAddressQuery: Dispatch<SetStateAction<string>>;
}

export const MapMobile = ({ setAddressQuery }: MapMobileProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { field } = useController<AdFormData>({ name: "location" });

  const [mapCenter, setMapCenter] = useState<[number, number]>([
    field.value.latitude,
    field.value.longitude,
  ]);
  const mapRef = useRef<ymaps.Map | null>(null);

  const { mutate } = useMutation<any, Error, CoordArgsType>({
    mutationFn: ({ latitude, longitude }) => {
      const controller = new AbortController();

      return locationService.getAddressByCoords(
        latitude,
        longitude,
        controller.signal
      );
    },
    onSuccess: handleSuccess,
  });
  const lastCoordsRef = useRef<[number, number] | null>(null);
  const { setValue } = useFormContext<AdFormData>();

  const handleMapAction = useCallback(
    (e: ymaps.IEvent) => {
      if (!mapRef.current) return;

      const coords = mapRef.current.getCenter();
      const [lat, lon] = coords;

      if (lastCoordsRef.current) {
        const [prevLat, prevLon] = lastCoordsRef.current;
        const delta = Math.sqrt(
          Math.pow(lat - prevLat, 2) + Math.pow(lon - prevLon, 2)
        );

        if (delta < 0.0001) return;
      }

      lastCoordsRef.current = [lat, lon];
      mutate({ latitude: lat, longitude: lon });
    },
    [mutate]
  );

  const debouncedMutate = useDebouncedCallback(handleMapAction, 500);

  const handleMapLoad = () => {
    setIsLoading(false);
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

    setMapCenter([Number(geo_lat), Number(geo_lon)]);
  }

  useEffect(() => {
    setMapCenter([field.value.latitude, field.value.longitude]);
  }, [field.value.latitude, field.value.longitude]);

  return (
    <div>
      {isLoading && (
        <Skeleton className="w-full h-[300px] rounded-2xl shadow bg-gray-200" />
      )}
      <Controller
        name="location"
        render={({ field }) => (
          <div className="relative w-full h-[300px]">
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
                  center: mapCenter,
                }}
                onLoad={handleMapLoad}
                onActionEnd={debouncedMutate}
                instanceRef={(map) => (mapRef.current = map)}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "calc(50% - 45px)", // Смещаем вверх на высоту маркера
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "45px",
                    height: "45px",
                    backgroundImage: "url(./pin.svg)",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                />
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
