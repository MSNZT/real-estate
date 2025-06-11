import { Ad } from "@/shared/config/apollo/generated";
import { Button } from "@/shared/ui";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AdDescriptionProps {
  toggleDescription: boolean;
  handleToggleDescription: () => void;
  description: Ad["description"];
}

export const AdDescription = ({
  toggleDescription,
  handleToggleDescription,
  description,
}: AdDescriptionProps) => {
  return (
    <div className="mt-5">
      <p className="font-bold text-2xl mb-2">Описание</p>
      <p>{toggleDescription ? description : description.slice(0, 300)}</p>
      {description.length >= 300 && (
        <Button
          onClick={handleToggleDescription}
          className="flex items-center gap-2 text-[#3393d4] hover:text-[#4e8ce8] font-normal text-md"
          size="clear"
          variant="ghost"
        >
          {toggleDescription ? (
            <>
              <span>Свернуть описание</span> <ChevronUp />
            </>
          ) : (
            <>
              <span>Показать полностью</span>
              <ChevronDown />
            </>
          )}
        </Button>
      )}
    </div>
  );
};
