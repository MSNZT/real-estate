"use client";
import { getPrettyPrice } from "@/entities/ad/utils/getPrettyPrice";
import { Button, Separator } from "@/shared/ui";
import { getDateValue } from "@/shared/utils/getDateValue";
import { useCalculatePrice } from "../api/useCalculatePrice";
import { useBookingWidget } from "../hooks/useBookingWidget";
import { BookingFormConfirmPopup } from "./Form/BookingFormConfirmPopup";
import { BookingDatePickerLayout } from "./DatePicker/BookingDatePickerLayout";
import { useAuthData } from "@/entities/user";
import { useRouter } from "next/navigation";
import { useClientMediaQuery } from "@/shared/lib/useClientMediaQuery";

interface BookingWidgetProps {
  adId: string;
  price: number;
}
export const BookingWidget = ({ adId, price }: BookingWidgetProps) => {
  const {
    countDays,
    dates,
    isOpenBookingPopup,
    isOpenCalendar,
    handleApplyCalendar,
    handleCloseCalendar,
    handleOpenBookingPopup,
    handleOpenCalendar,
  } = useBookingWidget();
  const { data } = useCalculatePrice(price, countDays);
  const isAuth = useAuthData((state) => state.isAuth);
  const router = useRouter();
  const isDesktop = useClientMediaQuery({
    minWidth: "1024px",
  });

  const totalPrice = getPrettyPrice(data?.totalPrice);
  const prepayment = getPrettyPrice(data?.prepayment);
  const remainder = getPrettyPrice(data?.remainder);

  const selectedDates = getDateValue({ from: dates?.[0], to: dates?.[1] });

  const renderButtonBookingPopup = () => {
    if (!dates) return null;
    return (
      <Button
        onClick={
          !isAuth
            ? () => router.push("/auth/login")
            : () => handleOpenBookingPopup(true)
        }
        size="clear"
        className="flex flex-col gap-0 p-2 bg-primary text-white rounded-lg mt-2 h-12 justify-center w-full hover:bg-primary-dark"
      >
        <p>Забронировать на {getDateValue({ from: dates[0], to: dates[1] })}</p>
      </Button>
    );
  };

  const renderCalendarButton = () => {
    return (
      !dates && (
        <Button
          onClick={handleOpenCalendar}
          size="clear"
          className="flex flex-col gap-0 p-2 bg-primary rounded-lg  w-full hover:bg-primary-dark mb-2"
        >
          <p className="text-white">Выбрать даты</p>
          <p className="text-xs text-gray-200">Чтобы уточнить стоимость</p>
        </Button>
      )
    );
  };

  const renderDateSelectButton = () => {
    return (
      <Button
        onClick={handleOpenCalendar}
        className="w-full mb-3"
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
    );
  };

  if (isDesktop) {
    return (
      <div>
        <p className="font-bold mb-1">Заселение и выезд</p>
        {renderDateSelectButton()}
        {renderCalendarButton()}

        <div className="relative">
          <BookingDatePickerLayout
            className="absolute top-10 right-0 w-[540px]"
            isMobile={!isDesktop}
            adId={adId}
            isOpen={isOpenCalendar}
            handleApply={handleApplyCalendar}
            // handleOpen={handleOpenBookingPopup}
            handleClose={handleCloseCalendar}
          />
        </div>

        {data && (
          <div className="flex flex-col gap-3">
            {renderButtonBookingPopup()}
            <div className="flex justify-between">
              <p>
                {getPrettyPrice(price)} × {countDays} суток
              </p>
              <p>{totalPrice}</p>
            </div>

            <Separator />

            <div className="flex justify-between font-bold mb-2">
              <p>Итого</p>
              <p>{totalPrice}</p>
            </div>
            <BookingFormConfirmPopup
              adId={adId}
              price={price}
              dates={dates}
              isOpen={isOpenBookingPopup}
              onClose={() => handleOpenBookingPopup(false)}
              countDays={countDays}
              prepayment={prepayment}
              remainder={remainder}
              totalPrice={totalPrice}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center">
      <BookingDatePickerLayout
        isMobile={!isDesktop}
        adId={adId}
        isOpen={isOpenCalendar}
        handleApply={handleApplyCalendar}
        handleClose={handleCloseCalendar}
      />
      {renderDateSelectButton()}
      {renderCalendarButton()}
      {renderButtonBookingPopup()}
      <BookingFormConfirmPopup
        adId={adId}
        dates={dates}
        isOpen={isOpenBookingPopup}
        onClose={() => handleOpenBookingPopup(false)}
        price={price}
        countDays={countDays}
        prepayment={prepayment}
        remainder={remainder}
        totalPrice={totalPrice}
      />
    </div>
  );
};
