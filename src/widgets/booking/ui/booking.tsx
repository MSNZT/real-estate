"use client";
import { Button } from "@/shared/ui";
import { getDateValue } from "@/shared/utils/getDateValue";
import { useAuth } from "@/entities/user";
import { useBookingDates } from "@/features/booking/hooks/useBookingDates";
import { BookingDatePickerLayout } from "@/features/booking/ui/DatePicker/BookingDatePickerLayout";
import { BookingFormConfirmPopup } from "@/features/booking/ui/Form/BookingFormConfirmPopup";
import { useBookingPrice } from "@/features/booking";
import { usePathname } from "next/navigation";
import { useAuthRequiredPopup } from "@/shared/lib/useAuthRequiredPopup";

export const Booking = ({ adId, price }: { adId: string; price: number }) => {
  const pathname = usePathname();
  const {
    countDays,
    dates,
    isOpenConfirm,
    isOpenCalendar,
    handleApplyCalendar,
    handleCloseCalendar,
    handleOpenCalendar,
    handleOpenConfirm,
    handleCloseConfirm,
  } = useBookingDates();
  const { isAuth } = useAuth();
  const { requiredAuthPopup, openAuthPopup } = useAuthRequiredPopup({
    redirect: pathname.slice(1),
  });

  const { prepayment, remainder, totalPrice } = useBookingPrice(
    price,
    countDays
  );

  const selectedDates = getDateValue({ from: dates?.[0], to: dates?.[1] });

  function onOpenConfirm() {
    if (!isAuth) {
      openAuthPopup();
      return;
    }
    handleOpenConfirm();
  }

  return (
    <div className="flex flex-col justify-center relative">
      {requiredAuthPopup}
      <BookingDatePickerLayout
        adId={adId}
        isOpen={isOpenCalendar}
        handleApply={handleApplyCalendar}
        handleClose={handleCloseCalendar}
      />
      <p className="font-bold mb-1">Заселение и выезд</p>
      <Button
        onClick={handleOpenCalendar}
        className="w-full mb-3 transparent hover:bg-transparent"
        variant="outline"
        size="default"
      >
        {selectedDates ? (
          <>
            <span>{selectedDates}</span>
            <span className="text-sm text-gray-400">
              - Кликните, чтобы изменить
            </span>
          </>
        ) : (
          <span className="text-gray-400">Выберите дату</span>
        )}
      </Button>
      {dates ? (
        <Button
          onClick={onOpenConfirm}
          size="clear"
          className="flex flex-col gap-0 p-2 bg-primary text-white rounded-lg mt-2 h-12 justify-center w-full hover:bg-primary-dark"
        >
          <p>
            Забронировать на{" "}
            {getDateValue({ from: dates?.[0], to: dates?.[1] })}
          </p>
        </Button>
      ) : (
        <Button
          onClick={handleOpenCalendar}
          size="clear"
          className="flex flex-col gap-0 p-2 bg-primary rounded-lg  w-full hover:bg-primary-dark mb-2"
        >
          <p className="text-white">Выбрать даты</p>
          <p className="text-xs text-gray-200">Чтобы уточнить стоимость</p>
        </Button>
      )}
      <BookingFormConfirmPopup
        adId={adId}
        dates={dates}
        isOpen={isOpenConfirm}
        onClose={handleCloseConfirm}
        price={price}
        countDays={countDays}
        prepayment={prepayment}
        remainder={remainder}
        totalPrice={totalPrice}
      />
    </div>
  );
};
