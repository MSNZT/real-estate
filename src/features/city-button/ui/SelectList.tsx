import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { useCallback, useEffect, useRef, useState } from "react";

type SelectItem = {
  value: string;
};

interface SelectListProps<T extends SelectItem> {
  data: T[] | undefined;
  handleSelected: (item: T) => void;
}

export const SelectList = <T extends SelectItem>({
  data,
  handleSelected,
}: SelectListProps<T>) => {
  const [currentSelectIndex, setCurrentSelectIndex] = useState<number | null>(
    null
  );
  const currentSelectRef = useRef<number | null>(null);

  const handlePressKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (!data?.length) return;

      const selectListData = data || [];
      const lastIndex = data?.length - 1;
      const current = currentSelectRef.current;

      setCurrentSelectIndex((prev) => {
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
        const item = selectListData[current];
        handleSelected(item);
      }
    },
    [data]
  );

  useEffect(() => {
    if (data?.length) {
      document.addEventListener("keydown", handlePressKeydown);
      return () => document.removeEventListener("keydown", handlePressKeydown);
    }
  }, [data]);

  return (
    <ul className="flex flex-col gap-2 " role="listbox">
      {data?.map((item, i) => (
        <li
          key={item.value}
          className={cn("group hover:bg-blue-300 w-full px-4", {
            "bg-blue-300 text-white": currentSelectIndex === i,
          })}
        >
          <Button
            onClick={() => handleSelected(item)}
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
  );
};
