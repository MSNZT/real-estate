import { addDays, isSameDay, isAfter, isBefore, startOfDay } from "date-fns";

interface GetDayClassNameParams {
  date: Date;
  startDate: Date | null;
  endDate: Date | null;
  hoveredDate: Date | null;
  minNights: number;
}

export function getDayClassName({
  date,
  startDate,
  endDate,
  hoveredDate,
  minNights,
}: GetDayClassNameParams) {
  const classes = ["relative"];
  const normalizedDate = startOfDay(date);
  const normalizedStartDate = startDate ? startOfDay(startDate) : null;
  const normalizedEndDate = endDate ? startOfDay(endDate) : null;
  const normalizedHovered = hoveredDate ? startOfDay(hoveredDate) : null;

  // Нет startDate — hover на любую дату
  if (
    !startDate &&
    hoveredDate &&
    isSameDay(normalizedDate, normalizedHovered)
  ) {
    classes.push("cd-radius-all", "cd-hovered");
  }

  // Есть startDate, но нет endDate (выделение диапазона)
  if (normalizedStartDate && !normalizedEndDate && normalizedHovered) {
    // startDate
    if (isSameDay(normalizedDate, normalizedStartDate)) {
      classes.push("cd-radius-all", "cd-shadow");
    }
    // hoveredDate (если курсор наведен на дату после startDate)
    else if (isSameDay(normalizedDate, normalizedHovered)) {
      classes.push("cd-radius-all", "cd-shadow");
    }
    // даты между startDate и hoveredDate (без скругления!)
    else if (
      isAfter(normalizedDate, normalizedStartDate) &&
      isBefore(normalizedDate, normalizedHovered)
    ) {
      classes.push("grayy");
    }
  }

  // Есть startDate и endDate (выбран диапазон)
  if (normalizedStartDate && normalizedEndDate) {
    if (isSameDay(normalizedDate, normalizedStartDate)) {
      classes.push("cd-radius-all", "cd-shadow");
    } else if (isSameDay(normalizedDate, normalizedEndDate)) {
      classes.push("cd-radius-all", "cd-shadow");
    }
    // внутри диапазона — ничего не добавляем, только фон диапазона
  }

  return classes.join(" ");
}
