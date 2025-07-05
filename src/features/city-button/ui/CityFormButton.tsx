"use client";
import { LocationStateType } from "@/shared/hooks/use-location";
import { CitySelectDialog } from "./CitySelectDialog";

export const CityFormButton = ({
  cityName,
  onChange,
}: {
  cityName: string;
  onChange: (location: LocationStateType) => void;
}) => {
  return (
    <CitySelectDialog
      city={cityName}
      onSelect={(location) => onChange(location)}
    />
  );
};
