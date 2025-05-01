import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { memo, useEffect } from "react";

interface CityListProps {
  data: any[];
  onClick: (item: any) => void;
  query: string;
  handlePresskeyDown: (e: KeyboardEvent) => void;
  currentSelect: number | null;
}

export const CityList = memo(
  ({
    data,
    onClick,
    query,
    handlePresskeyDown,
    currentSelect,
  }: CityListProps) => {
    useEffect(() => {
      document.addEventListener("keydown", handlePresskeyDown);

      return () => document.removeEventListener("keydown", handlePresskeyDown);
    }, [handlePresskeyDown]);

    if (!query.trim() && !data?.suggestions?.length) {
      return null;
    }

    return (
      <div>
        <ul className="flex flex-col gap-2">
          {data?.map((item, index) => (
            <li
              key={item.value}
              className={cn("group hover:bg-blue-300 w-full px-4", {
                "bg-blue-300 text-white": currentSelect === index,
              })}
            >
              <Button
                onClick={() => onClick(item)}
                className="py-2 w-full"
                variant="clear"
                size="clear"
              >
                <p className="group-hover:text-white text-base truncate">
                  {item.value}
                </p>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
