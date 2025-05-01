import { Ad, DurationRentTypes } from "@/shared/config/apollo/generated/types";

export function getDealPeriod(ad: Ad) {
  let period = "";

  console.log(ad);

  switch (ad.deal.durationRent) {
    case DurationRentTypes.Long: {
      return (period += "в месяц");
    }
    case DurationRentTypes.Short: {
      return (period += "за сутки");
    }
    default: {
      return period;
    }
  }
}
