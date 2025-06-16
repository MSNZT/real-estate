import { BookingCalculateResponse } from "@/features/booking/api/useCalculatePrice";
import { BOOKING_ENDPOINTS } from "../api/endpoints";
import { $api } from "../api/lib/axios";

class BookingService {
  async calculatePrice(
    price: number,
    countDays: number
  ): Promise<BookingCalculateResponse> {
    try {
      const { data } = await $api.post(BOOKING_ENDPOINTS.calculatePrice, {
        price,
        countDays,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
export const bookingService = new BookingService();
