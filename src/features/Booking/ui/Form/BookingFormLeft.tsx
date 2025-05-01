"use client";

import { Button, Input } from "@/shared/ui";
import { DialogDescription, DialogTitle } from "@/shared/ui/dialog";
import { BookingFormConditions } from "./BookingFormConditions";
import { BookingFormRules } from "./BookingFormRules";
import { DateRangeType } from "../../types/date.types";
import { getDateValue } from "@/shared/utils/getDateValue";
import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

interface BookingFormLeftProps {
  countDays: number | undefined;
  totalPrice: string | undefined;
  prepayment: string | undefined;
  price: number;
  remainder: string | undefined;
  isLoading: boolean;
  dates: DateRangeType;
  children: ReactNode;
}

export const BookingFormLeft = ({
  countDays,
  totalPrice,
  prepayment,
  remainder,
  isLoading,
  dates,
  price,
  children,
}: BookingFormLeftProps) => {
  const checkIn = getDateValue({ from: dates[0] });
  const checkOut = getDateValue({ to: dates[1] });
  return (
    <div className="flex flex-col basis-1/2 p-6">
      <DialogTitle className="text-2xl">Бронирование</DialogTitle>
      <DialogDescription className="visually-hidden">Правила</DialogDescription>
      <BookingFormRules checkIn={checkIn} checkOut={checkOut} />
      <div className="flex flex-col gap-2 mb-3">
        <h3 className="font-semibold text-xl">Контакты</h3>
        <p className="text-gray-400">
          Контакты являются необязательными для заполнения. Вы можете пропустить
          их, и мы автоматически возьмем данные из вашего профиля.
        </p>
        {children}
      </div>
      <BookingFormConditions
        countDays={countDays}
        prepayment={prepayment}
        remainder={remainder}
        totalPrice={totalPrice}
        price={price}
      />
      <Button disabled={isLoading} className="flex items-center justify-center">
        {isLoading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Забронировать"
        )}
      </Button>
    </div>
  );
};
