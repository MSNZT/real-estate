import { intervalToDuration } from "date-fns";
import { useCallback, useState } from "react";
import { DateRangeType } from "../types/date.types";

export const useBookingDates = () => {
  const [dates, setDates] = useState<DateRangeType | undefined>();
  const [countDays, setCountDays] = useState<number>();
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  function handleOpenConfirm() {
    setIsOpenConfirm(true);
  }

  function handleCloseConfirm() {
    setIsOpenConfirm(false);
  }

  function handleOpenCalendar() {
    setIsOpenCalendar(true);
  }

  function handleCloseCalendar() {
    setIsOpenCalendar(false);
  }

  const handleApplyCalendar = useCallback(
    (startDate: Date | null, endDate: Date | null) => {
      if (startDate && endDate) {
        const count = intervalToDuration({
          start: startDate,
          end: endDate,
        });
        setCountDays(count?.days);
        setDates([startDate, endDate]);
      }
    },
    []
  );

  return {
    dates,
    countDays,
    isOpenCalendar,
    isOpenConfirm,
    handleOpenCalendar,
    handleCloseCalendar,
    handleApplyCalendar,
    handleOpenConfirm,
    handleCloseConfirm,
  };
};
