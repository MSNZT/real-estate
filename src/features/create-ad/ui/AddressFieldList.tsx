import { FieldQuery } from "@/shared/ui/components/FieldQuery";
import { SelectList } from "@/shared/ui/components/SelectList";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { useClickOutSide } from "@/shared/lib/useClickOutside";
import { useFormContext, useWatch } from "react-hook-form";
import { formatAddress } from "../utils/formatAddress";
import { useLocation } from "@/shared/hooks/use-location";
import { useDebouncedCallback } from "@/shared/lib/useDebouncedCallback";
import { useSuggestions } from "../api/useSuggenstions";
import { AdFormData } from "../types/types";
import { AddressDetails } from "@/shared/types/location";

interface AddressFieldListProps {
  errors: string[];
  setAddressQuery: Dispatch<SetStateAction<string>>;
  addressQuery: string;
}

export const AddressFieldList = ({
  errors,
  setAddressQuery,
  addressQuery,
}: AddressFieldListProps) => {
  const [showAddressList, setShowAddressList] = useState(false);
  const addressListRef = useRef<HTMLDivElement | null>(null);
  const { setData: setLocation } = useLocation();
  const { mutateAsync, data, hasSuggestions } = useSuggestions();
  const { setValue } = useFormContext<AdFormData>();

  const address = useWatch({ name: "location.address" });

  const handleMutate = useCallback((value: string) => mutateAsync(value), []);
  const handleMutateDebounced = useDebouncedCallback(handleMutate, 400);

  const handleChangeAddress = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target.value;
      handleMutateDebounced(target);
      setAddressQuery(target);
      if (!showAddressList) setShowAddressList(true);
    },
    [handleMutateDebounced]
  );

  const handleClickSelected = useCallback((item: AddressDetails) => {
    const { city, settlement, geo_lat, geo_lon, street, house } = item;

    const locality = city ? city : settlement;
    const address = formatAddress(street, house);

    const locationData = {
      city: locality || "",
      latitude: Number(geo_lat),
      longitude: Number(geo_lon),
    };

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

    setAddressQuery(address);

    setLocation(locationData);
    setShowAddressList(false);
  }, []);

  const handleResetQuery = useCallback(() => {
    setValue("location.address", "");
    setAddressQuery("");
    setShowAddressList(false);
  }, []);

  const handleFocusField = () => setShowAddressList(true);

  useClickOutSide(addressListRef, () => setShowAddressList(false));

  return (
    <div className="relative mb-2" ref={addressListRef}>
      <div onFocus={handleFocusField}>
        <FieldQuery
          query={addressQuery}
          onReset={handleResetQuery}
          handleMutate={handleChangeAddress}
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
            checked={(item) => (item.city || item.settlement) === address}
            handleSelected={(item) => handleClickSelected(item)}
            data={data}
          />
        </div>
      )}
    </div>
  );
};
