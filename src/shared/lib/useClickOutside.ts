import { RefObject, useCallback, useEffect } from "react";

export const useClickOutSide = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  cb: () => void
) => {
  const handleClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    },
    [ref, cb]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);
};
