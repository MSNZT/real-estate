"use client";
import { Button } from "@/shared/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { getLocationByQuery } from "../api/getCityByQuery";
import { AxiosError } from "axios";
import { CityList } from "./CityList";
import { useCallback, useRef, useState } from "react";
import { FieldCity } from "./FieldCity";
import { useDebounce } from "@/shared/lib/useDebounce";
import { useLocationData } from "@/entities/user/model/store/useLocationData";

export const CityButton = () => {
  const { mutateAsync, data } = useMutation<any, AxiosError, string>({
    mutationFn: (query) => getLocationByQuery(query),
  });
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [currentSelect, setCurrentSelect] = useState<number | null>(null);
  const currentSelectRef = useRef<number | null>(null);
  const { setData, city } = useLocationData();

  const handleMutate = useCallback((value: string) => mutateAsync(value), []);
  const handleMutateDebounced = useDebounce(handleMutate, 400);

  const handleResetQuery = useCallback(() => {
    setQuery("");
    currentSelectRef.current = null;
  }, []);

  const handleClickCity = useCallback((item: any) => {
    const { city, settlement_with_type, geo_lat, geo_lon } = item.data;

    setData({
      city: city ? city : settlement_with_type,
      latitude: geo_lat,
      longitude: geo_lon,
    });

    setOpen(false);
  }, []);

  const handlePresskeyDown = useCallback(
    (e: KeyboardEvent) => {
      const suggestions = data?.suggestions || [];
      const lastIndex = suggestions.length - 1;
      const current = currentSelectRef.current;

      setCurrentSelect((prev) => {
        if (prev === null) {
          currentSelectRef.current = 0;
          return 0;
        }
        if (e.key === "ArrowDown") {
          const index = prev >= lastIndex ? 0 : prev + 1;
          currentSelectRef.current = index;
          return index;
        }
        if (e.key === "ArrowUp") {
          const index = prev <= 0 ? lastIndex : prev - 1;
          currentSelectRef.current = index;
          return index;
        }
        return prev;
      });

      if (current === null) return;
      if (e.key === "Enter") {
        const cityItem = suggestions[current];
        console.log(cityItem, currentSelect, currentSelectRef);

        const { city, settlement_with_type, geo_lat, geo_lon } = cityItem.data;

        setData({
          city: city ? city : settlement_with_type,
          latitude: geo_lat,
          longitude: geo_lon,
        });
        setOpen(false);
      }
    },
    [data?.suggestions]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{city}</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2 w-full h-full md:top-[40%] md:max-w-[500px] md:max-h-[560px] lg:max-w-[700px] px-0">
        <DialogTitle className="sr-only">Выбор города</DialogTitle>
        <DialogDescription className="sr-only">
          Выберите город для отображения объявления
        </DialogDescription>
        <div className="relative">
          <FieldCity
            query={query}
            onClick={handleResetQuery}
            handleMutate={(e) => {
              handleMutateDebounced(e.target.value);
              setQuery(e.target.value);
            }}
          />
          <CityList
            currentSelect={currentSelect}
            handlePresskeyDown={handlePresskeyDown}
            query={query}
            onClick={handleClickCity}
            data={data?.suggestions}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
