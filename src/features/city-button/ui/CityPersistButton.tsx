"use client";
import { useMutation } from "@tanstack/react-query";
import { CitySelectDialog } from "./CitySelectDialog";
import { $api } from "@/shared/api/lib/axios";
import { useRouter } from "next/navigation";
import { LocationStateType } from "@/shared/hooks/use-location";

export const CityPersistButton = ({ cityName }: { cityName: string }) => {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: (location: Omit<LocationStateType, "address">) => {
      return $api.post("location/apply-location", { ...location });
    },
  });
  return (
    <CitySelectDialog
      onSelect={async (location) => {
        await mutateAsync({
          city: location.city,
          latitude: location.latitude,
          longitude: location.longitude,
        });
        router.refresh();
      }}
      city={cityName}
    />
  );
};
