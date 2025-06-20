import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import { FieldQuery } from "./FieldQuery";
import { useDebounce } from "@/shared/lib/useDebounce";
import { LocationState } from "@/entities/user/store/useLocationData";
import { SelectList } from "./SelectList";
import { DataSuggestionType, SuggestionType } from "@/shared/types/location";
import { useSettlementSearch } from "../hooks/useSettlementSearch";
import { Loader } from "@/shared/ui";
import { TOP_CITIES } from "../const/topCities";

interface QuerySelectCityProps {
  setAddress: (item: LocationState["locationData"]) => void;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  city: string;
}

export const QuerySelectCity = ({
  setAddress,
  query,
  setQuery,
  city,
}: QuerySelectCityProps) => {
  const debouncedQuery = useDebounce(query, 400);
  const { data, isFetching } = useSettlementSearch(debouncedQuery);
  const cityList = !debouncedQuery ? TOP_CITIES : data?.suggestions;

  const handleChangeCity = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleResetQuery = useCallback(() => {
    setQuery("");
  }, []);

  const handleClickSelected = useCallback(
    (
      item:
        | SuggestionType
        | { value: string; data: Partial<DataSuggestionType> }
    ) => {
      const { city, settlement_with_type, geo_lat, geo_lon } = item.data;
      setAddress({
        city: (city ? city : settlement_with_type) as string,
        latitude: Number(geo_lat),
        longitude: Number(geo_lon),
        address: null,
      });
    },
    []
  );

  return (
    <div className="relative flex flex-col flex-1">
      <FieldQuery
        query={query}
        onReset={handleResetQuery}
        handleMutate={handleChangeCity}
        placeholder="Укажите название города"
        classNameWrapper="ml-4 mr-10 lg:mr-4"
      />
      {isFetching ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="mt-4">
          <SelectList
            handleSelected={(item) => handleClickSelected(item)}
            checked={({ data }) =>
              (data.city || data.settlement_with_type) === city
            }
            data={cityList}
          />
        </div>
      )}
    </div>
  );
};
