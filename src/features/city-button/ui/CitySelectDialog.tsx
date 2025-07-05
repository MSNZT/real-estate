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
import { QuerySelectCity } from "./QuerySelectCity";
import { ChevronDown } from "lucide-react";
import { LocationStateType } from "@/shared/hooks/use-location";

interface CitySelectDialog {
  onSelect?: (city: LocationStateType) => void;
  city: string;
}

export const CitySelectDialog = ({ city, onSelect }: CitySelectDialog) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="items-center cursor-pointer outline-gray-300 hover:outline-primary"
          variant="clear"
        >
          <span className="font-bold text-base">{city}</span>
          <ChevronDown size={22} />
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col gap-2 w-full h-full max-w-full md:top-[40%] md:max-w-[600px] md:max-h-[560px] px-0 bg-white md:rounded-xl"
      >
        <DialogTitle className="visually-hidden">Выбор города</DialogTitle>
        <DialogDescription className="visually-hidden">
          Выберите город для отображения объявлений
        </DialogDescription>
        <QuerySelectCity
          query={query}
          handleCloseDialog={handleCloseDialog}
          setQuery={setQuery}
          setAddress={(location) => {
            onSelect?.(location);
            setIsOpen(false);
          }}
          city={city}
        />
      </DialogContent>
    </Dialog>
  );
};
