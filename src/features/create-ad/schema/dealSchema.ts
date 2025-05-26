import { AdTypes } from "@/shared/config/apollo/generated";
import { z } from "zod";

const agentFee = z
  .number({ message: "Обязательно для заполнения" })
  .min(0, { message: "Минимальная комиссия 0%" })
  .max(100, { message: "Максимальная комиссия 100%" });
const bargain = z.boolean();
const deposit = z
  .number({ message: "Обязательно для заполнения" })
  .min(0, { message: "Минимальный залог 0%" })
  .max(100, { message: "Максимальный залог 100%" });
const utilitiesFee = z.string({ message: "Выберите один из вариантов" });

const price = z
  .number({ message: "Обязательно для заполнения" })
  .min(1000, {
    message: "Минимальная стоимость не может быть ниже 1000 рублей",
  })
  .max(10000000000, {
    message: "Максимальная стоимость не может превышать 10 млрд рублей",
  });

export function getDealSchema(adType: AdTypes) {
  let deal = z.object({
    price,
  });

  switch (adType) {
    case AdTypes.Sell: {
      return deal.extend({
        fields: z.object({
          bargain,
        }),
      });
    }
    case AdTypes.RentShort: {
      return deal.extend({
        fields: z.object({
          deposit,
        }),
      });
    }
    case AdTypes.RentLong: {
      return deal.extend({
        fields: z.object({
          agentFee,
          bargain,
          deposit,
          utilitiesFee,
        }),
      });
    }
    default:
      throw new Error("Неверный указан тип объявления");
  }
}
