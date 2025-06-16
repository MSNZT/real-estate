import { $apiWithAuth } from "@/shared/api/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useBookingOrders = () => {
  const { data, isLoading } = useQuery({
    queryKey: [],
    queryFn: () => $apiWithAuth.get("bookings/orders"),
  });
  return {
    data,
    isLoading,
  };
};
