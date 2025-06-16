import { $api } from "@/shared/api/lib/axios";
import { useQuery } from "@tanstack/react-query";

type BookingResponse = {
  startDate: Date;
  endDate: Date;
};

export const useBookingList = (adId: string, open?: boolean) => {
  const { data: response } = useQuery<{ data: BookingResponse[] }>({
    queryKey: ["occupied-dates", adId],
    queryFn: () => $api.get(`bookings/occupied-dates/${adId}`),
    enabled: !!adId,
  });

  return {
    data: response?.data,
  };
};
