import { z } from "zod";

const phoneSchema = z.object({
  phone: z
    .string({ message: "Укажите номер телефона" })
    .min(11, { message: "Неверно указан номер телефона" })
    .max(11, { message: "Неверно указан номер телефона" }),
});

export const bookingSchema = z.object({
  guestName: z.string().nonempty({ message: "Имя гостя не может быть пустым" }),
  guestPhone: phoneSchema.shape.phone,
});
