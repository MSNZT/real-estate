import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { Check } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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
  }, [data, handlePressKeydown]);

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
            {checked(item) && (
              <Check size={18} className="text-blue-400 ml-auto mr-2" />
            )}
          </Button>
        </li>
      ))}
    </ul>
  );
};
