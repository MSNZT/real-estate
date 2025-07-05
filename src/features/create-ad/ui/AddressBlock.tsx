import { MapComponent } from "./MapComponent";
import { AddressFieldList } from "./AddressFieldList";
import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form";
import { AdFormData } from "../types/types";
import { CityFormButton } from "@/features/city-button";
import { LocationStateType, useLocation } from "@/shared/hooks/use-location";

type LocationErrorKeys = "city" | "address";

const locationKeys: Record<LocationErrorKeys, string> = {
  city: "city",
  address: "address",
};

export const AddressBlock = () => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext<AdFormData>();
  const setData = useLocation((state) => state.setData);

  const errorArrayMessage = (
    Object.keys(locationKeys) as Array<keyof typeof locationKeys>
  )
    .map((key) => errors.location?.[key]?.message)
    .filter((message) => message !== undefined);

  function handleSelectCity(
    field: ControllerRenderProps,
    location: LocationStateType
  ) {
    field.onChange(location.city);
    setData(location);
    setValue("location.address", "");
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-3xl font-semibold">Адрес</h3>
        <Controller
          render={({ field }) => (
            <CityFormButton
              cityName={field.value}
              onChange={(location) => handleSelectCity(field, location)}
            />
          )}
          name="location.city"
        />
      </div>
      <AddressFieldList errors={errorArrayMessage} />
      <MapComponent />
    </div>
  );
};
