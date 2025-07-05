import { FieldQuery } from "@/shared/ui/components/FieldQuery";
import { SelectList } from "@/shared/ui/components/SelectList";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useClickOutSide } from "@/shared/lib/useClickOutside";
import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form";
import { formatAddress } from "../utils/formatAddress";
import { useLocation } from "@/shared/hooks/use-location";
import { useDebouncedCallback } from "@/shared/lib/useDebouncedCallback";
import { useSuggestions } from "../api/useSuggenstions";
import { AdFormData } from "../types/types";
import { AddressDetails } from "@/shared/types/location";

export const AddressFieldList = ({ errors }: { errors: string[] }) => {
  const [showAddressList, setShowAddressList] = useState(false);
  const addressListRef = useRef<HTMLDivElement | null>(null);
  const { setData: setLocation } = useLocation();
  const { mutateAsync, data, hasSuggestions } = useSuggestions();
  const { reset } = useFormContext<AdFormData>();

  const handleMutate = useCallback((value: string) => mutateAsync(value), []);
  const handleMutateDebounced = useDebouncedCallback(handleMutate, 400);

  const handleChangeCity = useCallback(
    (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps) => {
      const target = e.target.value;
      handleMutateDebounced(target);
      field.onChange(target);
      if (!showAddressList) setShowAddressList(true);
    },
    [handleMutateDebounced]
  );

  const handleClickSelected = useCallback(
    (item: AddressDetails, field: ControllerRenderProps) => {
      const { city, settlement, geo_lat, geo_lon, street, house } = item;

      const locality = city ? city : settlement;
      const address = formatAddress(street, house);

      const locationData = {
        city: settlement || "",
        latitude: Number(geo_lat),
        longitude: Number(geo_lon),
      };

      reset({ location: locationData });
      field.onChange(address);
      setLocation(locationData);
      setShowAddressList(false);
    },
    []
  );

  const handleResetQuery = useCallback((field: ControllerRenderProps) => {
    // setLocation({ address: null });
    field.onChange("");
    setShowAddressList(false);
  }, []);

  const handleFocusField = () => setShowAddressList(true);

  useClickOutSide(addressListRef, () => setShowAddressList(false));

  return (
    <Controller
      render={({ field }) => {
        return (
          <div className="relative mb-2" ref={addressListRef}>
            <div onFocus={handleFocusField}>
              <FieldQuery
                // query={addressField || ""}
                query={field.value || ""}
                onReset={() => handleResetQuery(field)}
                handleMutate={(e) => handleChangeCity(e, field)}
                placeholder="Введите адрес или укажите на карте"
                classNameWrapper="mb-2"
              />
              {errors.length > 0 &&
                errors.map((error) => (
                  <p className="text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            {showAddressList && hasSuggestions && (
              <div className="absolute top-10 inset-x-0 z-20 bg-white shadow">
                <SelectList
                  // query={query}
                  checked={(item) =>
                    (item.city || item.settlement) === field.value
                  }
                  handleSelected={(item) => handleClickSelected(item, field)}
                  data={data}
                />
              </div>
            )}
          </div>
        );
      }}
      name="location.address"
    />
  );
};
