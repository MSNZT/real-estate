"use client";
import { useMediaQuery } from "react-responsive";

import { getPrettyPrice } from "@/entities/ad/utils/getPrettyPrice";
import { Button, Input, Separator } from "@/shared/ui";
import { getDateValue } from "@/shared/utils/getDateValue";
import { useCalculatePrice } from "../api/useCalculatePrice";
import { useBookingWidget } from "../hooks/useBookingWidget";
import { BookingFormPopup } from "./Form/BookingFormPopup";
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
  const { isMedia: isDesktop, isMounted } = useClientMediaQuery({
    minWidth: "1024px",
  });

  if (!isMounted) return <div className="basis-1/3"></div>;

  const totalPrice = getPrettyPrice(data?.totalPrice);
  const prepayment = getPrettyPrice(data?.prepayment);
  const remainder = getPrettyPrice(data?.remainder);

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
        className="flex flex-col gap-0 p-2 bg-sky-700 rounded-xl mt-2 h-12 justify-center w-full hover:bg-sky-800"
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
          className="flex flex-col gap-0 p-2 bg-sky-700 rounded-xl mt-2 w-full hover:bg-sky-800 max-w-[400px]"
        >
          <p>Выбрать даты</p>
          <p className="text-xs text-gray-200">Чтобы уточнить стоимость</p>
        </Button>
      )
    );
  };

  if (isDesktop) {
    return (
      <div className="basis-1/3">
        <p className="font-bold mb-1">Заселение и выезд</p>
        <div className="relative">
          <Input
            value={getDateValue({ from: dates?.[0], to: dates?.[1] })}
            // Нужно доделать
            // onChange={() => {}}?
            placeholder="Выберите дату"
            readOnly
            onClick={handleOpenCalendar}
          />
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

        {renderCalendarButton()}

        {data && (
          <div className="flex flex-col gap-3 mt-4">
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
            <BookingFormPopup
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
    <div className="flex justify-center">
      <BookingDatePickerLayout
        isMobile={!isDesktop}
        adId={adId}
        isOpen={isOpenCalendar}
        handleApply={handleApplyCalendar}
        handleOpen={handleOpenBookingPopup}
        handleClose={handleCloseCalendar}
      />

      {renderCalendarButton()}
      {renderButtonBookingPopup()}
      <BookingFormPopup
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
