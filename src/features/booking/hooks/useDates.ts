import {
  addDays,
  eachDayOfInterval,
  isAfter,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { useMemo } from "react";
import { useBookingList } from "../api/useBookingList";
import { OccupiedDate } from "../types/booking.types";

const MIN_NIGHTS = 4;

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

  // Добавляем все прошлые дни (до today) к disabled
  const today = startOfDay(new Date());
  const firstDayThisMonth = startOfMonth(today);

  // Получаем массив всех дат с начала месяца до today (не включая today)
  const allPastDates: Date[] = eachDayOfInterval({
    start: firstDayThisMonth,
    end: today,
  }).filter((d) => d < today);

  // Собираем disabledDates: из сервера + все прошедшие дни
  const disabledDates = useMemo(() => {
    const serverDates = Array.from(blockedDaysSet).map((ts) =>
      startOfDay(new Date(ts))
    );
    const dates = [...serverDates, ...allPastDates];

    // Удаляем дубликаты
    const unique = Array.from(new Set(dates.map((d) => d.getTime()))).map(
      (ts) => new Date(ts)
    );
    return unique;
  }, [blockedDaysSet, today.getTime()]);

  const getIsDateEnabled = (
    blockedDaysSet: Set<number>,
    startDate: Date | null,
    endDate: Date | null
  ) => {
    return (date: Date): boolean => {
      const day = startOfDay(date).getTime();

      if (blockedDaysSet.has(day) || date < today) return false;
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
  }, [
    blockedDaysSet,
    startDate?.getTime(),
    endDate?.getTime(),
    MIN_NIGHTS,
    today.getTime(),
  ]);

  return {
    isDateEnabled,
    disabledDates,
    minNights: MIN_NIGHTS,
  };
};
