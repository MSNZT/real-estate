import { ChangeEvent } from "react";
import { FieldQuery } from "./FieldQuery";
import { Button } from "@/shared/ui";
import { X } from "lucide-react";

interface CitySelectHeader {
  query: string;
  handleResetQuery: () => void;
  handleChangeCity: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCloseDialog: () => void;
}

export const CitySelectHeader = ({
  query,
  handleChangeCity,
  handleResetQuery,
  handleCloseDialog,
}: CitySelectHeader) => {
  return (
    <div className="flex items-center gap-1 px-4 relative">
      <Button
        className="md:absolute md:-right-12 md:-top-7.5 md:text-white md:hover:text-white/80 transition-colors duration-300"
        variant="clear"
        size="icon"
        onClick={handleCloseDialog}
      >
        <X />
      </Button>
      <FieldQuery
        query={query}
        onReset={handleResetQuery}
        handleMutate={handleChangeCity}
        placeholder="Укажите название города"
        classNameWrapper="w-full"
        classNameField="h-10 bg-gray-100 rounded-xl border-0 pr-9 md:text-lg"
      />
    </div>
  );
};
