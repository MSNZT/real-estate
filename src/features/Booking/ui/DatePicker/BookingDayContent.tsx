import { addDays, isWithinInterval, startOfDay } from "date-fns";
import { memo, useState } from "react";

interface BookingDayContentProps {
  day: number;
  date: Date;
  minNights: number;
  startDate: Date | null;
  endDate: Date | null;
}

export const BookingDayContent = memo(
  ({ date, day, minNights, startDate, endDate }: BookingDayContentProps) => {
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
    const minEndDate = startDate && addDays(startDate, minNights);
    const isInMinRange =
      startDate &&
      !endDate &&
      isWithinInterval(date, {
        start: startOfDay(startDate),
        end: startOfDay(minEndDate),
      });

    return (
      <div
        className="day-container"
        onMouseEnter={() => isInMinRange && setHoveredDate(date)}
        onMouseLeave={() => setHoveredDate(null)}
      >
        <div>{day}</div>

        {/* {hoveredDate?.getTime() === date.getTime() && isInMinRange && (
          <div className="date-tooltip">
            Минимум от {minNights} ночей
          </div>
        )} */}
      </div>
    );
  }
);
