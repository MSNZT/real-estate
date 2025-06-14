"use client";

import { useCallback } from "react";
import { useBookingCreate } from "../../api/useBookingCreate";
import { BookingFormLeft } from "./BookingFormLeft";
import { BookingFormRight } from "./BookingFormRight";
import { DateRangeType } from "../../types/date.types";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui";
import { useAuth } from "@/entities/user";

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
  const { user } = useAuth();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      guestName: "",
      guestPhone: "",
    },
  });

  const onSubmit = useCallback(
    (contacts: { guestName?: string; guestPhone?: string }) => {
      if (dates !== undefined && dates[0] && dates[1] && user) {
        const [start, end] = dates;
        const { guestName, guestPhone } = contacts;

        mutate({
          adId,
          startDate: start,
          endDate: end,
          guestName: guestName || user?.email,
          guestPhone: guestPhone || user.phone,
          guestCounts: 2, // Нужно доделать
        });
      }
    },
    [adId, dates]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="lg:flex h-full lg:rounded-xl overflow-hidden">
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
      </div>
    </form>
  );
};
