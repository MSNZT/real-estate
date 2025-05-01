import { addDays, isWithinInterval, startOfDay } from "date-fns";
import { useCallback, useMemo } from "react";
import { useBookingList } from "../api/useBookingList";

export const useBlockedDates = (
  adId: string,
  startDate: Date | null,
  endDate: Date | null
) => {
  const { data } = useBookingList(adId);
  const blockedDates = useMemo(
    () =>
      data?.map(({ startDate, endDate }) => ({
        start: new Date(startDate),
        end: addDays(new Date(endDate), -1),
      })) || [],
    [data]
  );

  const sortedBlockedDates = useMemo(
    () => [...blockedDates].sort((a, b) => a.start.getTime() - b.end.getTime()),
    [blockedDates]
  );

  const firstBlockedStartAfterStartDate =
    startDate &&
    sortedBlockedDates.find((date) => startDate < date.start)?.start;

  const isDateDisabled = useCallback(
    (date: Date) => {
      const normalizedDate = startOfDay(date);

      const isBlocked = blockedDates.some(({ start, end }) => {
        const normalizedStart = startOfDay(start);
        const normalizedEnd = startOfDay(end);

        return isWithinInterval(normalizedDate, {
          start: normalizedStart,
          end: normalizedEnd,
        });
      });

      if (isBlocked) return false;

      if (startDate && endDate) {
        return true;
      }

      if (
        startDate &&
        firstBlockedStartAfterStartDate &&
        normalizedDate > startOfDay(firstBlockedStartAfterStartDate)
      ) {
        return false;
      }

      return true;
    },
    [startDate, blockedDates]
  );

  return {
    isDateDisabled,
  };
};
