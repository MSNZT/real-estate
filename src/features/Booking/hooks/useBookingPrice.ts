import { getPrettyPrice } from "@/shared/utils/getPrettyPrice";
import { useCalculatePrice } from "../api/useCalculatePrice";

export const useBookingPrice = (
  price: number,
  countDays: number | undefined
) => {
  const data = useCalculatePrice(price, countDays);
  const totalPrice = getPrettyPrice(data?.totalPrice);
  const prepayment = getPrettyPrice(data?.prepayment);
  const remainder = getPrettyPrice(data?.remainder);
  return {
    totalPrice,
    prepayment,
    remainder,
  };
};
