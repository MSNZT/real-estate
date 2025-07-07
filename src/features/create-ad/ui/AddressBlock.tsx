import { MapComponent } from "./MapComponent";
import { AddressFieldList } from "./AddressFieldList";
import { useFormContext, useWatch } from "react-hook-form";
import { AdFormData } from "../types/types";
import { CityFormButton } from "@/features/city-button";
import { LocationStateType } from "@/shared/hooks/use-location";
import { useState } from "react";
import { MapMobile } from "./map/MapMobile";
import { useClientMediaQuery } from "@/shared/lib/useClientMediaQuery";

type LocationErrorKeys = "city" | "address";

const locationKeys: Record<LocationErrorKeys, string> = {
  city: "city",
  address: "address",
};

export const AddressBlock = () => {
  const [addressQuery, setAddressQuery] = useState("");
  const isMobile = useClientMediaQuery({ maxWidth: "768px" });

  console.log("isMobile", isMobile);
  const {
    formState: { errors },
    setValue,
  } = useFormContext<AdFormData>();

  const city = useWatch({ name: "location.city" });

  const errorArrayMessage = (
    Object.keys(locationKeys) as Array<keyof typeof locationKeys>
  )
    .map((key) => errors.location?.[key]?.message)
    .filter((message) => message !== undefined);

  function handleSelectCity(location: LocationStateType) {
    setAddressQuery("");
    setValue(
      "location",
      {
        city: location.city,
        latitude: location.latitude,
        longitude: location.longitude,
        address: "",
      },
      { shouldDirty: true }
    );
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-3xl font-semibold">Адрес</h3>
        <CityFormButton cityName={city ?? ""} onChange={handleSelectCity} />
      </div>
      <AddressFieldList
        errors={errorArrayMessage}
        addressQuery={addressQuery}
        setAddressQuery={setAddressQuery}
      />
      {isMobile ? (
        <MapMobile setAddressQuery={setAddressQuery} />
      ) : (
        <MapComponent setAddressQuery={setAddressQuery} />
      )}
    </div>
  );
};
