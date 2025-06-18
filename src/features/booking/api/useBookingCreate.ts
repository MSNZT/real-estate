import { $apiWithAuth } from "@/shared/api/lib/axios";
import { useMutation } from "@tanstack/react-query";
import {
  BookingCreateDto,
  BookingCreateResponse,
} from "../types/booking.types";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
      toast.success("Бронь успешно создана", { duration: 2000 });
    },
  });

  return {
    data: data,
    mutate,
    isLoading: isPending,
  };
};
