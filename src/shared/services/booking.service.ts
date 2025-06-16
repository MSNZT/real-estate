import { BookingCalculateResponse } from "@/features/booking/api/useCalculatePrice";
import { BOOKING_ENDPOINTS } from "../api/endpoints";
import { $api } from "../api/lib/axios";

class BookingService {
  async calculatePrice(
    price: number,
    countDays: number
  ): Promise<BookingCalculateResponse> {
    try {
      return await $api.post(BOOKING_ENDPOINTS.calculatePrice, {
        price,
        countDays,
      });
    } catch (error) {
      throw error;
    }
  }
}
export const bookingService = new BookingService();
