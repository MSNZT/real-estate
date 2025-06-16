import { useQuery } from "@tanstack/react-query";
import { bookingService } from "@/shared/services/booking.service";

export type BookingCalculateResponse = {
  prepayment: number;
  remainder: number;
  totalPrice: number;
};

export const useCalculatePrice = (
  price: number,
  countDays: number | undefined
) => {
  const { data } = useQuery<BookingCalculateResponse>({
    queryKey: ["booking", "price", countDays, price],
    queryFn: () => bookingService.calculatePrice(price, countDays!),
    enabled: !!countDays,
  });

  return data;
};
