import { useEffect, useState } from "react";
import { useMediaQuery, MediaQueryAllQueryable } from "react-responsive";

export const useClientMediaQuery = (query: MediaQueryAllQueryable) => {
  const isMedia = useMediaQuery(query);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMedia]);
  return isMounted && isMedia;
};
