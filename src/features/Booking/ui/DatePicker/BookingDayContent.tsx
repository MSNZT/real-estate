import { cn } from "@/shared/lib/utils";
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
    const [hovered, setHovered] = useState(false);
    const normalizedDate = startOfDay(date);
    const normalizedStartDate = startDate ? startOfDay(startDate) : null;
    const minNightsEndDate =
      normalizedStartDate && addDays(normalizedStartDate, minNights);

    const showTooltip =
      hovered &&
      normalizedStartDate &&
      (normalizedStartDate.getTime() === normalizedDate.getTime() ||
        (normalizedDate.getTime() > normalizedStartDate.getTime() &&
          minNightsEndDate &&
          normalizedDate.getTime() < minNightsEndDate.getTime())) &&
      !endDate;

    const showMinNights =
      !endDate &&
      normalizedStartDate &&
      normalizedDate.getTime() > normalizedStartDate.getTime() &&
      minNightsEndDate &&
      normalizedDate.getTime() < minNightsEndDate?.getTime();

    return (
      <div
        className="day-container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={cn(showMinNights && "hint")}>{day}</div>

        {showTooltip && (
          <div className="day-tooltip">
            <span>Минимум от {minNights} ночей</span>
          </div>
        )}
      </div>
    );
  }
);
