import { MapComponent } from "./MapComponent";
import { CityButton } from "@/features/city-button/ui/CityButton";
import { AddressFieldList } from "./AddressFieldList";
import { useFormContext } from "react-hook-form";
import { AdFormData } from "../types/types";

type LocationErrorKeys = "city" | "address";

const locationKeys: Record<LocationErrorKeys, string> = {
  city: "city",
  address: "address",
};

export const AddressBlock = () => {
  const {
    formState: { errors },
  } = useFormContext<AdFormData>();

  const errorArrayMessage = (
    Object.keys(locationKeys) as Array<keyof typeof locationKeys>
  )
    .map((key) => errors.location?.[key]?.message)
    .filter((message) => message !== undefined);

  return (
    <div className="mt-4">
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-3xl font-semibold">Адрес</h3>
        <CityButton />
      </div>
      <AddressFieldList errors={errorArrayMessage} />
      <MapComponent />
    </div>
  );
};
