"use client";

import { useCallback } from "react";
import { useBookingCreate } from "../../api/useBookingCreate";
import { BookingFormLeft } from "./BookingFormLeft";
import { BookingFormRight } from "./BookingFormRight";
import { DateRangeType } from "../../types/date.types";
import { useAuthData } from "@/entities/user";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui";

interface BookingFormProps {
  adId: string;
  dates: DateRangeType | undefined;
  price: number;
  countDays: number | undefined;
  totalPrice: string | undefined;
  prepayment: string | undefined;
  remainder: string | undefined;
}

export const BookingForm = ({
  adId,
  dates,
  countDays,
  prepayment,
  remainder,
  totalPrice,
  price,
}: BookingFormProps) => {
  const { isLoading, mutate } = useBookingCreate();
  const userData = useAuthData((state) => state.userData);
  console.log(userData);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      guestName: "",
      guestPhone: "",
    },
  });

  const onSubmit = useCallback(
    (contacts: { guestName?: string; guestPhone?: string }) => {
      if (dates !== undefined && dates[0] && dates[1]) {
        const [start, end] = dates;
        const { guestName, guestPhone } = contacts;

        mutate({
          adId,
          startDate: start,
          endDate: end,
          guestName: guestName || userData?.email,
          guestPhone,
          guestCounts: 2, // Нужно доделать
        });
      }
    },
    [adId, dates]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BookingFormLeft
        dates={dates}
        countDays={countDays}
        totalPrice={totalPrice}
        prepayment={prepayment}
        remainder={remainder}
        isLoading={isLoading}
        price={price}
      >
        <Input
          {...register("guestName", { required: false })}
          type="text"
          className="h-[44px] bg-gray-200 border-0 focus-visible:ring-0 w-full"
          placeholder="Имя"
        />
        <Input
          {...register("guestPhone", { required: false })}
          type="text"
          className="h-[44px] bg-gray-200 border-0 focus-visible:ring-0  w-full"
          placeholder="Номер телефона"
        />
      </BookingFormLeft>
      <BookingFormRight />
    </form>
  );
};
