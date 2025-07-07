import { z } from "zod";

export const contactSchema = z.object({
  name: z.string({ message: "Укажите имя" }),
  email: z.string({ message: "Укажите почту" }).email(),
  phone: z.string({ message: "Укажите телефон" }),
  communication: z.enum(["calls-and-message", "calls-only", "message-only"], {
    message: "Укажите способ связи",
  }),
});
