"use client";

import { Container } from "@/shared/ui";
import { useBookingOrders } from "../api/useBookingOrders";

export const BookingPage = () => {
  const { data, isLoading } = useBookingOrders();

  return (
    <Container className="flex flex-col gap-4 mt-4">
      <h1 className="font-semibold text-3xl mb-3">Мои заказы</h1>
      <section>
        <h2 className="font-semibold text-2xl">Активные</h2>
      </section>
      <section>
        <h2 className="font-semibold text-2xl">Завершённые</h2>
      </section>
    </Container>
  );
};
