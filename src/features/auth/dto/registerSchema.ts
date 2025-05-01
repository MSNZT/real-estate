import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({ message: "Укажите email" })
      .email("Неверный формат почты"),
    name: z.string({ message: "Укажите имя" }),
    password: z
      .string({ message: "Укажите пароль" })
      .min(4, { message: "Минимальная длина пароля 4 символа" }),
    confirmPassword: z
      .string({ message: "Укажите пароль" })
      .min(4, { message: "Минимальная длина пароля 4 символа" }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });
