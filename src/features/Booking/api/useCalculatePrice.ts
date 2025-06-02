import { useQuery } from "@tanstack/react-query";
import { $api } from "@/shared/api/lib/axios";
import { AxiosResponse } from "axios";

type BookingCalculateResponse = {
  prepayment: number;
  remainder: number;
  totalPrice: number;
};

export const useCalculatePrice = (
  price: number,
  countDays: number | undefined
) => {
  const { data } = useQuery<AxiosResponse<BookingCalculateResponse>>({
    queryKey: [],
    queryFn: () => $api.post("/booking/calculate", { countDays, price }),
    enabled: !!countDays,
  });

  return {
    data: data?.data,
    countDays,
  };
};
