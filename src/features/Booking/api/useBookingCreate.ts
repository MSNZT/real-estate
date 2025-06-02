import { $apiWithAuth } from "@/shared/api/lib/axios";
import { useMutation } from "@tanstack/react-query";

export type BookingCreateDto = {
  adId: string;
  startDate: Date;
  endDate: Date;
  guestName: string;
  guestPhone: string;
};

export const useBookingCreate = () => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: (data: BookingCreateDto) =>
      $apiWithAuth.post("/booking/create", data),
  });

  return {
    data: data,
    mutate,
    isLoading: isPending,
  };
};
