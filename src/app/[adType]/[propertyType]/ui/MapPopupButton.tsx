"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui";
import { MapIcon } from "lucide-react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { YMapComponent } from "./Map";
import { YMaps } from "@pbe/react-yandex-maps";

export const MapPopupButton = () => {
  const trigger = (
    <Button variant="outline">
      <span className="sr-only sm:not-sr-only">Указать на карте </span>
      <MapIcon />
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[581px] h-full p-0 rounded-xl max-w-[900px] overflow-y-hidden">
        <DialogTitle />
        <DialogDescription />
        <YMaps query={{ apikey: "551d826c-1a13-4de5-9eba-b5ac8eecaa4b" }}>
          <YMapComponent />
        </YMaps>
      </DialogContent>
    </Dialog>
  );
};
