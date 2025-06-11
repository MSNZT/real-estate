"use client";
import { Button } from "@/shared/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useState } from "react";
import { useLocationData } from "@/entities/user/store/useLocationData";
import { QuerySelectCity } from "./QuerySelectCity";
import { ChevronDown } from "lucide-react";

export const CityButton = ({ city }: { city: string }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { locationData, setData } = useLocationData();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="items-center cursor-pointer outline-gray-300 hover:outline-primary"
          variant="clear"
        >
          <span className="font-bold text-base">{city}</span>
          <ChevronDown size={22} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2 w-full h-full md:top-[40%] md:max-w-[500px] md:max-h-[560px] px-0 bg-white md:rounded-xl">
        <DialogTitle className="visually-hidden">Выбор города</DialogTitle>
        <DialogDescription className="visually-hidden">
          Выберите город для отображения объявлений
        </DialogDescription>
        <QuerySelectCity
          query={query}
          setQuery={setQuery}
          setAddress={(data) => {
            setData(data);
            setOpen(false);
          }}
          city={locationData.city}
        />
      </DialogContent>
    </Dialog>
  );
};
