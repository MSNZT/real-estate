import { Ad, AdTypes } from "@/shared/config/apollo/generated";

export function getDealPeriod(ad: Ad) {
  let period = "";

  switch (ad.adType) {
    case AdTypes.RentLong: {
      return (period += "в месяц");
    }
    case AdTypes.RentShort: {
      return (period += "за сутки");
    }
    default: {
      return period;
    }
  }
}
