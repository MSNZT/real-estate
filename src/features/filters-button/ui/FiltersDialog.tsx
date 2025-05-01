"use client";
import { ReactNode, useState } from "react";
import { Button } from "@/shared/ui";
import { Settings2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { FiltersContent } from "./FiltersContent";

interface FilterDialogProps {
  // button: ReactNode;
}

export const FilterDialog = ({}: FilterDialogProps) => {
  const [open, setOpen] = useState(false);

  function onClosePopup() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant="outline">
          <Settings2 size={18} />
          <span>Фильтры</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[200px] max-h-[700px] rounded-xl max-w-[900px] overflow-y-hidden">
        <DialogTitle />
        <DialogDescription />
        <div
          className="p-5 space-y-4 pe-8 overflow-y-auto [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <FiltersContent onClose={onClosePopup} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
