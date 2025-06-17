import { addDays, isAfter, isWithinInterval, startOfDay } from "date-fns";
import { useCallback, useMemo } from "react";
import { useBookingList } from "../api/useBookingList";
import { OccupiedDate } from "../types/booking.types";

export const useDates = (
  adId: string,
  startDate: Date | null,
  endDate: Date | null
) => {
  const { data } = useBookingList(adId);

  const normalizeBlockedDates = (data: OccupiedDate[]) => {
    const blockedSet = new Set<number>();

    for (const { startDate, endDate } of data) {
      let current = startOfDay(new Date(startDate));
      const end = startOfDay(new Date(endDate));

      while (current < end) {
        blockedSet.add(current.getTime());
        current = addDays(current, 1);
      }
    }

    return blockedSet;
  };

  const blockedDaysSet = useMemo(() => {
    return data ? normalizeBlockedDates(data) : new Set<number>();
  }, [data]);

  const getIsDateEnabled = (
    blockedDaysSet: Set<number>,
    startDate: Date | null,
    endDate: Date | null
  ) => {
    return (date: Date): boolean => {
      const day = startOfDay(date).getTime();

      if (blockedDaysSet.has(day)) return false;
      if (startDate && endDate) return true;
      if (startDate && !endDate) {
        const start = startOfDay(startDate);

        const blockedAfter: Date | undefined = [...blockedDaysSet]
          .map((timeStamp) => new Date(timeStamp))
          .filter((d) => isAfter(d, start))
          .sort((a, b) => a.getTime() - b.getTime())[0];

        if (blockedAfter && isAfter(date, blockedAfter)) {
          return false;
        }
      }
      return true;
    };
  };

  const isDateEnabled = useMemo(() => {
    return getIsDateEnabled(blockedDaysSet, startDate, endDate);
  }, [blockedDaysSet, startDate?.getTime(), endDate?.getTime()]);

  return {
    isDateEnabled,
  };
};
