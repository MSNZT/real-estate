"use client";

import { useCallback } from "react";
import { useBookingCreate } from "../../api/useBookingCreate";
import { BookingFormLeft } from "./BookingFormLeft";
import { BookingFormRight } from "./BookingFormRight";
import { DateRangeType } from "../../types/date.types";
import { FormProvider, useForm } from "react-hook-form";
import { FieldInput, Input } from "@/shared/ui";
import { useAuth } from "@/entities/user";
import { PhoneInputField } from "@/features/auth/ui/PhoneInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "../../schema/booking.schema";

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

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: user?.name || "",
      guestPhone: user?.phone || "",
    },
  });

  const submitDisabled =
    isLoading || form.formState.isDirty || !form.formState.isValid;

  const onSubmit = useCallback(
    (contacts: { guestName: string; guestPhone: string }) => {
      if (dates && dates[0] && dates[1] && user) {
        const [start, end] = dates;
        const { guestName, guestPhone } = contacts;

        mutate({
          adId,
          startDate: start,
          endDate: end,
          guestName: guestName,
          guestPhone: guestPhone,
          guestCounts: 2, // Нужно доделать
        });
      }
    },
    [adId, dates]
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="lg:flex h-full lg:rounded-xl overflow-hidden">
          <BookingFormLeft
            dates={dates}
            countDays={countDays}
            totalPrice={totalPrice}
            prepayment={prepayment}
            remainder={remainder}
            disabled={submitDisabled}
            price={price}
          >
            {/* <Input
            {...register("guestName", { required: false })}
            type="text"
            className="h-[44px] bg-gray-200 border-0 focus-visible:ring-0 w-full"
            placeholder="Имя"
          /> */}
            <FieldInput name="guestName" placeholder="Имя" />
            <PhoneInputField defaultValue={user?.phone} name="guestPhone" />
            {/* <Input
            {...register("guestPhone", { required: false })}
            type="text"
            className="h-[44px] bg-gray-200 border-0 focus-visible:ring-0  w-full"
            placeholder="Номер телефона"
          /> */}
          </BookingFormLeft>
          <BookingFormRight />
        </div>
      </form>
    </FormProvider>
  );
};
