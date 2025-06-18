import { ReactNode } from "react";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import { useDates } from "../../hooks/useDates";
import { BookingDayContent } from "./BookingDayContent";
import { DateRangeType } from "../../types/date.types";

import "./DatePicker.scss";
import { DatePickerHeaderMobile } from "./DatePickerHeaderMobile";
import {
  addDays,
  endOfMonth,
  getDay,
  isSameDay,
  startOfDay,
  startOfMonth,
  subDays,
} from "date-fns";
import { cn } from "@/shared/lib/utils";

interface BookingDatePickerProps {
  adId: string;
  isMobile: boolean;
  children: (startDate: Date | null, endDate: Date | null) => ReactNode;
  datesRange: DateRangeType;
  handleDateChange: (newDates: DateRangeType) => void;
}

export const BookingDatePicker = ({
  adId,
  isMobile,
  children,
  datesRange,
  handleDateChange,
}: BookingDatePickerProps) => {
  const [startDate, endDate] = datesRange;
  const { isDateEnabled, disabledDates, visuallyDisabledDates } = useDates(
    adId,
    startDate,
    endDate
  );

  const handleDateChangeCustom = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && end) {
      if (addDays(start, 2) > end) {
        return;
      }
    }
    handleDateChange(dates);
  };

  // const dayClassName = (date: Date) =>
  //   getDayClassName({
  //     date,
  //     startDate,
  //     endDate,
  //     hoveredDate,
  //     minNights: 2,
  //   });

  const getSelectedDays = (date: Date) => {
    if (date.getTime() === startDate?.getTime()) {
      return "react-datepicker__day--selected-startDate";
    }

    if (date.getTime() === endDate?.getTime()) {
      return "react-datepicker__day--selected-endDate";
    }

    if (
      startDate &&
      endDate &&
      date.getTime() > startDate.getTime() &&
      date.getTime() < endDate.getTime()
    ) {
      return "react-datepicker__day--selected-range";
    }
  };

  console.log(disabledDates.map((d) => d.toISOString()));

  const dayClassName = (date: Date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const outsideMonth = date.getMonth() !== monthStart.getMonth();

    return cn(
      getDisabledDayClassName(
        date,
        disabledDates,
        monthStart,
        monthEnd,
        outsideMonth
      ),
      getSelectedDays(date),
      getHintMinNightsDay(date)
    );
  };

  function getHintMinNightsDay(date: Date) {
    const normalizedDate = startOfDay(date);
    const normalizedStartDate = startDate ? startOfDay(startDate) : null;
    const minNightsEndDate =
      normalizedStartDate && addDays(normalizedStartDate, 2);
    const isInMinNights =
      !endDate &&
      normalizedStartDate &&
      normalizedDate.getTime() > normalizedStartDate.getTime() &&
      minNightsEndDate &&
      normalizedDate.getTime() < minNightsEndDate.getTime();
    return isInMinNights ? "hint" : "";
  }

  function getDisabledDayClassName(
    date: Date,
    disabledDates: Date[],
    monthStart: Date,
    monthEnd: Date,
    outsideMonth: boolean,
    weekStartsOn: number = 1
  ): string {
    const norm = startOfDay(date);

    if (outsideMonth) return "";

    const isDisabled = disabledDates.some((d) => isSameDay(d, norm));
    if (!isDisabled) return "";

    const prev = subDays(norm, 1);
    const next = addDays(norm, 1);

    const isPrevInMonth = prev >= monthStart && prev <= monthEnd;
    const isNextInMonth = next >= monthStart && next <= monthEnd;

    const isPrevDisabled =
      isPrevInMonth && disabledDates.some((d) => isSameDay(d, prev));
    const isNextDisabled =
      isNextInMonth && disabledDates.some((d) => isSameDay(d, next));

    const dayOfWeek = getDay(norm);
    const isFirstDayOfWeek = dayOfWeek === weekStartsOn;
    const isLastDayOfWeek = dayOfWeek === (weekStartsOn + 6) % 7;

    // Если нет ни слева, ни справа disabled — одиночный
    if (!isPrevDisabled && !isNextDisabled) {
      return "react-datepicker__day--disabled-single";
    }

    // Если справа нет дня месяца ИЛИ это последний день недели — treat как single!
    if (!isNextInMonth || isLastDayOfWeek) {
      if (!isPrevDisabled) {
        return "react-datepicker__day--disabled-single";
      } else {
        return "react-datepicker__day--disabled-range-end";
      }
    }
    // Если слева нет дня месяца ИЛИ это первый день недели — treat как single!
    if (!isPrevInMonth || isFirstDayOfWeek) {
      if (!isNextDisabled) {
        return "react-datepicker__day--disabled-single";
      } else {
        return "react-datepicker__day--disabled-range-start";
      }
    }

    // Обычный range-start/range-end
    if (!isPrevDisabled && isNextDisabled) {
      return "react-datepicker__day--disabled-range-start";
    }
    if (isPrevDisabled && !isNextDisabled) {
      return "react-datepicker__day--disabled-range-end";
    }
    if (isPrevDisabled && isNextDisabled) {
      return "react-datepicker__day--disabled-range-middle";
    }
    return "";
  }

  return (
    <DatePicker
      selectsRange
      readOnly
      calendarClassName="no-scrollbar"
      startDate={startDate}
      endDate={endDate}
      onChange={handleDateChangeCustom}
      filterDate={isDateEnabled}
      dayClassName={dayClassName}
      // dayClassName={(date) => {
      //   const normalizedDate = startOfDay(date);
      //   const normalizedStartDate = startDate ? startOfDay(startDate) : null;
      //   const minNightsEndDate =
      //     normalizedStartDate && addDays(normalizedStartDate, 2);
      //   const isInMinNights =
      //     !endDate &&
      //     normalizedStartDate &&
      //     normalizedDate.getTime() > normalizedStartDate.getTime() &&
      //     minNightsEndDate &&
      //     normalizedDate.getTime() < minNightsEndDate.getTime();
      //   return isInMinNights ? "hint" : "";
      // }}
      // dayClassName={dayClassName}
      renderDayContents={
        isMobile
          ? undefined
          : (day, date) => (
              <BookingDayContent
                day={day}
                date={date}
                minNights={2}
                endDate={endDate}
                startDate={startDate}
              />
            )
      }
      renderCustomHeader={
        isMobile
          ? (props) => <DatePickerHeaderMobile monthDate={props.monthDate} />
          : undefined
      }
      locale={ru}
      minDate={new Date()}
      monthsShown={isMobile ? 12 : 2}
      disabledKeyboardNavigation
      inline
    >
      {children(startDate, endDate)}
    </DatePicker>
  );
};
