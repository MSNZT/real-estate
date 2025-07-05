import { locationService } from "@/shared/services/location.service";
import { AddressDetails } from "@/shared/types/location";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSuggestions = () => {
  const { mutateAsync, data } = useMutation<
    AddressDetails[] | undefined,
    AxiosError,
    string
  >({
    mutationFn: (query) => locationService.getAddressByQuery(query),
  });

  return {
    mutateAsync,
    data,
    hasSuggestions: data && data.length > 0,
  };
};
