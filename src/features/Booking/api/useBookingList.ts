import { $api } from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";

type BookingResponse = {
  startDate: Date;
  endDate: Date;
};

export const useBookingList = (adId: string, open?: boolean) => {
  const { data } = useQuery<{ data: BookingResponse[] }>({
    queryKey: ["bookingList"],
    queryFn: () => $api.get(`booking/details/${adId}`),
    enabled: adId !== undefined,
  });

  return {
    data: data?.data,
  };
};
