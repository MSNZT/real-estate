import { $api } from "@/shared/api/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { OccupiedDate } from "../types/booking.types";

export const useBookingList = (adId: string) => {
  const { data: response } = useQuery<{ data: OccupiedDate[] }>({
    queryKey: ["occupied-dates", adId],
    queryFn: () => $api.get(`bookings/occupied-dates/${adId}`),
    enabled: !!adId,
  });

  return {
    data: response?.data,
  };
};
