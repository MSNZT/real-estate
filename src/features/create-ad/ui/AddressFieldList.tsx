import { FieldQuery } from "@/features/city-button/ui/FieldQuery";
import { SelectList } from "@/features/city-button/ui/SelectList";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useDebounce } from "@/shared/lib/useDebounce";
import { useLocationData } from "@/entities/user/store/useLocationData";
import { useClickOutSide } from "@/shared/lib/useClickOutside";
import { locationService } from "@/shared/services/location.service";
import { Controller, ControllerRenderProps } from "react-hook-form";
import { formatAddress } from "../utils/formatAddress";
import { AddressResponseType, SuggestionType } from "@/shared/types/location";

export const AddressFieldList = ({ errors }: { errors: string[] }) => {
  const [showAddressList, setShowAddressList] = useState(false);
  const addressListRef = useRef<HTMLDivElement | null>(null);
  const { setData: setLocation, locationData } = useLocationData();

  const { mutateAsync, data } = useMutation<
    AddressResponseType,
    AxiosError,
    string
  >({
    mutationFn: (query) => locationService.getAddressByQuery(query),
  });
  const hasSuggestions = data?.suggestions && data.suggestions.length > 0;

  const handleMutate = useCallback((value: string) => mutateAsync(value), []);
  const handleMutateDebounced = useDebounce(handleMutate, 400);

  const handleChangeCity = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleMutateDebounced(e.target.value);
      setLocation({});
      if (!showAddressList) setShowAddressList(true);
    },
    [handleMutateDebounced]
  );

  const handleClickSelected = useCallback(
    (item: SuggestionType, field: ControllerRenderProps) => {
      const {
        city,
        settlement_with_type,
        geo_lat,
        geo_lon,
        street_with_type,
        house,
      } = item.data;

      const settlement = city ? city : settlement_with_type;
      const address = formatAddress(street_with_type, house);

      const locationData = {
        city: settlement,
        address: address || null,
        latitude: Number(geo_lat),
        longitude: Number(geo_lon),
      };

      field.onChange({
        ...field.value,
        ...locationData,
      });
      setLocation(locationData);
      setShowAddressList(false);
    },
    []
  );

  const handleResetQuery = useCallback(() => {
    setLocation({ address: null });
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
                query={locationData.address || ""}
                onReset={handleResetQuery}
                handleMutate={handleChangeCity}
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
                  handleSelected={(item) => handleClickSelected(item, field)}
                  data={data.suggestions}
                />
              </div>
            )}
          </div>
        );
      }}
      name="location"
    />
  );
};
