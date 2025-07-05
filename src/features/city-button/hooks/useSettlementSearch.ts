import { locationService } from "@/shared/services/location.service";
import { AddressDetails } from "@/shared/types/location";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSettlementSearch = (query: string) => {
  return useQuery<string, AxiosError, AddressDetails[]>({
    queryKey: ["settlements", query],
    queryFn: ({ queryKey }) =>
      locationService.getSettlementByQuery(queryKey[1] as string),
    enabled: !!query,
    staleTime: 2 * 60 * 1000,
  });
};
