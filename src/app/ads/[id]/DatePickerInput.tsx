"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { addDays, isWithinInterval, startOfDay } from "date-fns";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { ru } from "date-fns/locale";
import { flip, offset, size } from "@floating-ui/react";
import { Button, Input } from "@/shared/ui";

import { useBookingList } from "../../../features/Booking/api/useBookingList";
import { getDateValue } from "@/shared/utils/getDateValue";
import "./DatePicker.css";
import { useClickOutSide } from "@/shared/lib/useClickOutside";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer";
import { X } from "lucide-react";

interface DatePickerInputProps {
  adId: string;
  minNights: number;
  handleApply: (startDate: Date, endDate: Date) => void;
  handleClose: () => void;
  handleOpen: () => void;
  isOpen: boolean;
  isMobile?: boolean;
}

export const DatePickerInput = ({
  adId,
  handleApply,
  handleClose,
  handleOpen,
  minNights,
  isOpen,
  isMobile = false,
}: DatePickerInputProps) => {
  const { data } = useBookingList(adId);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const calendarRef = useRef(null);

  // useClickOutSide(calendarRef, handleClose);

  function handleResetDate() {
    setStartDate(undefined);
    setEndDate(undefined);
  }
  function handleApplyDates() {
    console.log(startDate, endDate);

    handleApply(startDate, endDate);
    handleClose();
  }

  const handleDateChange = useCallback(
    (update: [Date | null, Date | null]) => {
      const [newStart, newEnd] = update;

      if (newEnd) {
        if (newStart && newEnd < newStart) {
          setStartDate(newEnd);
          setEndDate(newStart);
        } else {
          setStartDate(newStart);
          setEndDate(newEnd);
        }
      } else {
        if (startDate && newStart) {
          if (newStart < startDate) {
            setStartDate(newStart);
            setEndDate(startDate);
          } else {
            setStartDate(newStart);
            setEndDate(undefined);
          }
        } else {
          setStartDate(newStart);
        }
      }
    },
    [startDate]
  );

  const renderDayContents = useMemo(
    () => (day: number, date: Date) => {
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

          {hoveredDate?.getTime() === date.getTime() && isInMinRange && (
            <div className="date-tooltip">Минимум от {minNights} ночей</div>
          )}
        </div>
      );
    },
    [startDate, endDate, isDateDisabled]
  );

  return (
    <>
      <Input
        className="disabled:bg-[#eee] disabled:cursor-pointer w-full focus-within:ring-0"
        onClick={handleOpen}
        placeholder="Выберите даты"
        aria-label="календарь"
        readOnly
      />
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerHeader />
        <DrawerContent className="h-[95%]">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex justify-between items-center px-4 mt-6 mb-3 drawer-content-inner h-full"
          >
            {/* <DrawerClose>
              <X />
            </DrawerClose> */}
            <DrawerTitle className="text-center text-[15px]">
              Заселение и выезд
            </DrawerTitle>
            <Button
              className="text-gray-400"
              variant="clear"
              size="clear"
              onClick={(e) => {
                e.stopPropagation();
                handleResetDate();
              }}
            >
              Очистить
            </Button>
          </div>
          <WeekDaysHeader locale="ru-RU" />
          <DatePicker
            // ref={calendarRef}
            selectsRange
            readOnly
            calendarClassName="no-scrollbar"
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            filterDate={isDateDisabled}
            renderDayContents={renderDayContents}
            renderCustomHeader={isMobile ? () => <></> : undefined}
            locale={ru}
            minDate={new Date()}
            monthsShown={12}
            open={isOpen}
            onClickOutside={handleClose}
            inline
          >
            {startDate && endDate && (
              <div className="fixed bottom-7 inset-x-4">
                <Button
                  onClick={handleApplyDates}
                  className="w-full justify-center"
                >
                  Применить
                </Button>
              </div>
            )}
          </DatePicker>
        </DrawerContent>
      </Drawer>
    </>
  );
};
