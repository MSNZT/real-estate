import { z } from "zod";

export const emailSchema = z.object({
  email: z.string({ message: "Укажите email" }).email("Неверный формат почты"),
});

export const codeSchema = z.object({
  code: z
    .string({ message: "Укажите 6 значный код" })
    .min(6, { message: "Укажите 6 значный код" })
    .max(6),
});

export const passwordSchema = z.object({
  password: z
    .string({ message: "Укажите пароль" })
    .min(6, { message: "Минимальная длина пароля 6 символов" })
    .max(20, { message: "Максимальная длина пароля 20 символов" }),
});

export const loginSchema = z
  .object({
    password: z.string({ message: "Укажите пароль" }),
  })
  .extend(emailSchema.shape);

export const phoneSchema = z.object({
  phone: z
    .string({ message: "Укажите номер телефона" })
    .min(11, { message: "Неверно указан номер телефона" })
    .max(11, { message: "Неверно указан номер телефона" }),
});

export const registerSchema = z
  .object({
    name: z.string({ message: "Укажите имя" }),
    confirmPassword: z
      .string({ message: "Укажите пароль" })
      .min(6, { message: "Минимальная длина пароля 6 символов" })
      .max(20, { message: "Максимальная длина пароля 20 символов" }),
    phone: phoneSchema.shape.phone,
  })
  .extend(emailSchema.shape)
  .extend(passwordSchema.shape)
  .refine((value) => value.password === value.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    confirmPassword: z
      .string({ message: "Укажите пароль" })
      .min(6, { message: "Минимальная длина пароля 6 символов" })
      .max(20, { message: "Максимальная длина пароля 20 символов" }),
  })
  .extend(passwordSchema.shape)
  .refine((value) => value.password === value.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });
