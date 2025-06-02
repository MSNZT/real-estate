import { AxiosError } from "axios";
import { ChangeEvent, useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FieldQuery } from "./FieldQuery";
import { useDebounce } from "@/shared/lib/useDebounce";
import { LocationState } from "@/entities/user/store/useLocationData";
import { SelectList } from "./SelectList";
import { locationService } from "../../../shared/services/location.service";
import { AddressResponseType, SuggestionType } from "@/shared/types/location";

interface QuerySelectCityProps {
  setAddress?: (item: LocationState) => void;
}

export const QuerySelectCity = ({ setAddress }: QuerySelectCityProps) => {
  const { mutateAsync, data } = useMutation<
    AddressResponseType,
    AxiosError,
    string
  >({
    mutationFn: (query) => locationService.getSettlementByQuery(query),
  });
  const [query, setQuery] = useState("");

  const handleMutate = useCallback((value: string) => mutateAsync(value), []);
  const handleMutateDebounced = useDebounce(handleMutate, 400);

  const handleChangeCity = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    handleMutateDebounced(e.target.value);
    setQuery(e.target.value);
  }, []);

  const handleResetQuery = useCallback(() => {
    setQuery("");
  }, []);

  const handleClickSelected = useCallback((item: SuggestionType) => {
    const { city, settlement_with_type, geo_lat, geo_lon } = item.data;
    setAddress?.({
      city: (city ? city : settlement_with_type) as string,
      latitude: Number(geo_lat),
      longitude: Number(geo_lon),
      street: null,
      house: null,
    });
  }, []);

  return (
    <div className="relative">
      <FieldQuery
        query={query}
        onReset={handleResetQuery}
        handleMutate={handleChangeCity}
        placeholder="Укажите название города"
        classNameWrapper="ml-4 mr-10 lg:mr-4 mb-3"
      />
      <SelectList
        handleSelected={(item) => handleClickSelected(item)}
        data={data?.suggestions}
      />
    </div>
  );
};
