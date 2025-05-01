import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ message: "Укажите email" }).email("Неверный формат почты"),
  password: z.string({ message: "Укажите пароль" }),
});
