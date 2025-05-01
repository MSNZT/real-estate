import { Button, Input } from "@/shared/ui";
import { X } from "lucide-react";
import { ChangeEvent } from "react";

interface FieldCityProps {
  query: string;
  onClick: () => void;
  handleMutate: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FieldCity = ({ query, handleMutate, onClick }: FieldCityProps) => {
  return (
    <div className="relative mb-4 ml-4 mr-10">
      <Input
        value={query}
        onChange={handleMutate}
        className="placeholder:text-base"
        placeholder="Введите населённый пункт"
      />
      {query.trim() && (
        <Button
          onClick={onClick}
          className="block absolute right-3 top-1/2 -translate-y-1/2"
          variant="clear"
          size="clear"
        >
          <X size={12} />
        </Button>
      )}
    </div>
  );
};
