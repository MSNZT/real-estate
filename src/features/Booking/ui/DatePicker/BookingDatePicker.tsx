import { ReactNode } from "react";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import { useDates } from "../../hooks/useDates";
import { BookingDayContent } from "./BookingDayContent";
import { DateRangeType } from "../../types/date.types";

import "./DatePicker.scss";
import { DatePickerHeaderMobile } from "./DatePickerHeaderMobile";

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
  const { isDateDisabled } = useDates(adId, startDate, endDate);

  return (
    <DatePicker
      selectsRange
      readOnly
      calendarClassName="no-scrollbar"
      startDate={startDate}
      endDate={endDate}
      onChange={handleDateChange}
      filterDate={isDateDisabled}
      renderDayContents={(day, date) => (
        <BookingDayContent
          day={day}
          date={date}
          minNights={2}
          endDate={endDate}
          startDate={startDate}
        />
      )}
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
