import { useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback(
  cb: (...args: any) => void,
  delay: number
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = useCallback(
    (...args: any) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => cb(...args), delay);
    },
    [cb, delay]
  );

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return debouncedFn;
}
