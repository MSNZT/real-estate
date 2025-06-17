import { useCallback, useRef, useState } from "react";
import { X } from "lucide-react";
import { BookingDatePicker } from "./BookingDatePicker";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
} from "@/shared/ui/drawer";
import { WeekDaysHeader } from "./WeekDaysHeader";
import { Button } from "@/shared/ui";
import { DateRangeType } from "../../types/date.types";
import { DialogDescription, DialogTitle } from "@/shared/ui/dialog";
import { useClickOutSide } from "@/shared/lib/useClickOutside";
import { useClientMediaQuery } from "@/shared/lib/useClientMediaQuery";

interface BookingDatePickerLayout {
  adId: string;
  handleApply: (startDate: Date | null, endDate: Date | null) => void;
  handleClose: () => void;
  isOpen: boolean;
}

export const BookingDatePickerLayout = ({
  adId,
  handleApply,
  handleClose,
  isOpen,
}: BookingDatePickerLayout) => {
  const [datesRange, setDatesRange] = useState<DateRangeType>([null, null]);
  const modalCalendarRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useClientMediaQuery({ minWidth: "1024px" });

  useClickOutSide(modalCalendarRef, handleClose);

  const handleDateChange = useCallback((newDates: DateRangeType) => {
    const [start, end] = newDates;
    if (end) {
      setDatesRange(end < start! ? [end, start] : [start, end]);
    } else {
      setDatesRange([start, null]);
    }
  }, []);

  const handleDateReset = useCallback(() => {
    setDatesRange([null, null]);
  }, []);

  if (!isDesktop) {
    return (
      <Drawer open={isOpen} onOpenChange={handleClose}>
        <DrawerContent className="h-[95%] bg-white rounded-2xl">
          <DrawerHeader>
            <div className="flex justify-between items-center">
              <DrawerClose asChild>
                <Button size="clear" variant="clear">
                  <X />
                </Button>
              </DrawerClose>
              <DialogTitle className="font-bold">
                Дата заезда и выезда
              </DialogTitle>
              <Button
                onClick={handleDateReset}
                size="clear"
                variant="clear"
                className="text-gray-400"
              >
                Очистить
              </Button>
            </div>
          </DrawerHeader>
          <WeekDaysHeader locale="ru-RU" />
          <DialogDescription className="visually-hidden" />
          <BookingDatePicker
            adId={adId}
            isMobile={!isDesktop}
            datesRange={datesRange}
            handleDateChange={handleDateChange}
          >
            {(startDate, endDate) =>
              startDate &&
              endDate && (
                <div className="fixed bottom-7 inset-x-4">
                  <Button
                    onClick={() => {
                      handleApply(startDate, endDate);
                      handleClose();
                    }}
                    className="w-full justify-center"
                  >
                    <span className="text-white">Применить</span>
                  </Button>
                </div>
              )
            }
          </BookingDatePicker>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    isOpen && (
      <div ref={modalCalendarRef} className="absolute right-0 top-[70px]">
        <BookingDatePicker
          adId={adId}
          isMobile={!isDesktop}
          datesRange={datesRange}
          handleDateChange={handleDateChange}
        >
          {(startDate, endDate) => (
            <div className="flex items-center gap-2">
              <Button
                onClick={handleDateReset}
                className="w-full justify-center bg-black hover:bg-black/80"
              >
                <span className="text-white">Очистить</span>
              </Button>
              {startDate && endDate && (
                <Button
                  onClick={() => {
                    handleApply(startDate, endDate);
                    handleClose();
                  }}
                  className="w-full justify-center"
                >
                  <span className="text-white">Применить</span>
                </Button>
              )}
            </div>
          )}
        </BookingDatePicker>
      </div>
    )
  );
};
