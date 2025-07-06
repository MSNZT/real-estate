import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import { useDebounce } from "@/shared/lib/useDebounce";
import { SelectList } from "../../../shared/ui/components/SelectList";
import { useSettlementSearch } from "../hooks/useSettlementSearch";
import { Loader } from "@/shared/ui";
import { TOP_CITIES } from "../const/topCities";
import { CitySelectHeader } from "./CitySelectHeader";
import { cn } from "@/shared/lib/utils";
import { LocationStateType } from "@/shared/hooks/use-location";
import { AddressDetails } from "@/shared/types/location";

interface QuerySelectCityProps {
  setAddress: (item: LocationStateType) => void;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  city: string;
  className?: string;
  handleCloseDialog: () => void;
}

export const QuerySelectCity = ({
  setAddress,
  query,
  setQuery,
  city,
  className,
  handleCloseDialog,
}: QuerySelectCityProps) => {
  const debouncedQuery = useDebounce(query, 400);
  const { data, isFetching } = useSettlementSearch(debouncedQuery);
  const cityList = !debouncedQuery ? TOP_CITIES : data;

  const handleChangeCity = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleResetQuery = useCallback(() => {
    setQuery("");
  }, []);

  const handleClickSelected = useCallback((item: AddressDetails) => {
    const { city, settlement, geo_lat, geo_lon } = item;
    console.log(item);
    setAddress({
      city: (city ? city : settlement) as string,
      latitude: Number(geo_lat),
      longitude: Number(geo_lon),
      address: null,
    });
  }, []);

  return (
    <div className={cn("relative flex flex-col flex-1", className)}>
      <CitySelectHeader
        query={query}
        handleChangeCity={handleChangeCity}
        handleResetQuery={handleResetQuery}
        handleCloseDialog={handleCloseDialog}
      />
      {isFetching ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="mt-4">
          <SelectList
            handleSelected={(item) => handleClickSelected(item)}
            // checked={(data) =>
            //   (data.city || d) === city
            // }
            data={cityList}
          />
        </div>
      )}
    </div>
  );
};
