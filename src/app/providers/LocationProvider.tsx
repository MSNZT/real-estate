"use client";
import { LocationState, useLocation } from "@/shared/hooks/use-location";
import { useIsMounted } from "@/shared/lib/useIsMounted";
import { ReactNode, useEffect } from "react";

interface LocationProviderProps {
  children: ReactNode;
  location: LocationState["location"] | undefined;
}

export const LocationProvider = ({
  children,
  location,
}: LocationProviderProps) => {
  const isMounted = useIsMounted();
  const setData = useLocation((state) => state.setData);

  console.log("provider", location);

  useEffect(() => {
    if (isMounted) setData(location);
  }, [isMounted, location]);

  return children;
};
