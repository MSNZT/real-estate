import { cn } from "@/shared/lib/utils";
import { addDays, startOfDay } from "date-fns";
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
    const normalizedDate = startOfDay(date);
    const normalizedStartDate = startDate ? startOfDay(startDate) : null;
    const minNightsEndDate =
      normalizedStartDate && addDays(normalizedStartDate, minNights);

    const showTooltip =
      startDate &&
      hoveredDate &&
      normalizedStartDate &&
      (normalizedStartDate.getTime() === normalizedDate.getTime() ||
        (normalizedDate.getTime() > normalizedStartDate.getTime() &&
          minNightsEndDate &&
          normalizedDate.getTime() < minNightsEndDate.getTime())) &&
      !endDate;

    const isMinNights =
      !endDate &&
      normalizedStartDate &&
      normalizedDate.getTime() > normalizedStartDate.getTime() &&
      minNightsEndDate &&
      normalizedDate.getTime() < minNightsEndDate.getTime();

    return (
      <div
        className={cn("day-container", {
          hint: isMinNights,
        })}
        onMouseEnter={() => setHoveredDate(date)}
        onMouseLeave={() => setHoveredDate(null)}
      >
        <>
          <div className="day">{day}</div>
          {showTooltip && (
            <div className="min-nights-tooltip">
              <span>Минимум от {minNights} ночей</span>
            </div>
          )}
        </>
      </div>
    );
  }
);
