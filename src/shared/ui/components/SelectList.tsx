"use client";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { Check } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type SelectItem = {
  value: string;
};

interface SelectListProps<T extends SelectItem> {
  data: T[] | undefined;
  handleSelected: (item: T) => void;
  checked: (item: T) => boolean;
}

export const SelectList = <T extends SelectItem>({
  data,
  handleSelected,
  checked,
}: SelectListProps<T>) => {
  const [currentSelectIndex, setCurrentSelectIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    setCurrentSelectIndex(null);
  }, [data]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!data?.length) return;

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();

        setCurrentSelectIndex((prev) => {
          if (prev === null) {
            return e.key === "ArrowDown" ? 0 : data.length - 1;
          }
          if (e.key === "ArrowDown") {
            return prev >= data.length - 1 ? 0 : prev + 1;
          }
          if (e.key === "ArrowUp") {
            return prev <= 0 ? data.length - 1 : prev - 1;
          }
          return prev;
        });
      }

      if (
        e.key === "Enter" &&
        currentSelectIndex !== null &&
        data[currentSelectIndex]
      ) {
        handleSelected(data[currentSelectIndex]);
      }
    },
    [data, currentSelectIndex, handleSelected]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <ul className="flex flex-col gap-2 " role="listbox">
      {data?.map((item, i) => (
        <li
          key={item.value}
          className={cn("group hover:bg-blue-100 w-full px-4", {
            "bg-blue-100": currentSelectIndex === i,
          })}
        >
          <Button
            onClick={() => handleSelected(item)}
            className="py-2 w-full items-center"
            variant="clear"
            size="clear"
          >
            <span className="text-base truncate">{item.value}</span>
            {/* {checked(item) && (
              <Check size={18} className="text-blue-400 ml-auto mr-2" />
            )} */}
          </Button>
        </li>
      ))}
    </ul>
  );
};
