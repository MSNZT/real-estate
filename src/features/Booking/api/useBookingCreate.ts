import { $apiWithAuth } from "@/shared/api/lib/axios";
import { useMutation } from "@tanstack/react-query";
import {
  BookingCreateDto,
  BookingCreateResponse,
} from "../types/booking.types";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useBookingCreate = () => {
  const router = useRouter();

  const { data, mutate, isPending } = useMutation<
    BookingCreateResponse,
    AxiosError,
    BookingCreateDto
  >({
    mutationFn: (data) => $apiWithAuth.post("/bookings/create", data),
    onSuccess: (data) => {
      router.push(`/orders/${data.id}`);
    },
  });

  return {
    data: data,
    mutate,
    isLoading: isPending,
  };
};
