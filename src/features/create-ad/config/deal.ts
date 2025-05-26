import { AdTypes } from "@/shared/config/apollo/generated";
import { type FieldSection, type FormField } from "../types/types";

export const bargain = {
  type: "radio",
  name: "deal.fields.bargain",
  label: "Торг",
  options: [
    {
      value: true,
      label: "Возможен",
    },
    { value: false, label: "Нет" },
  ],
} satisfies FormField;

export const deposit = {
  type: "nested",
  label: "Залог",
  nestedFields: [
    {
      type: "number",
      placeholder: "Процент, %",
      name: "deal.fields.deposit",
    },
    {
      type: "radio",
      name: "deal.fields.deposit",
      options: [
        {
          value: 0,
          label: "Без залога",
        },
        { value: 50, label: "50%" },
        { value: 100, label: "100%" },
      ],
    },
  ],
} satisfies FormField;

export const utilitiesFee = {
  type: "radio",
  name: "deal.fields.utilitiesFee",
  label: "Коммунальные платежи",
  options: [
    {
      value: "included",
      label: "Включены в стоимость",
    },
    { value: "only-counters", label: "Только счётчики" },
    { value: "whole-recepit", label: "Вся квитанция" },
  ],
} satisfies FormField;

export const agentFee = {
  type: "nested",
  label: "Комиссия агента",
  nestedFields: [
    {
      type: "number",
      placeholder: "Процент, %",
      name: "deal.fields.agentFee",
    },
    {
      type: "radio",
      name: "deal.fields.agentFee",
      options: [
        {
          value: 0,
          label: "Без комиссии",
        },
        { value: 50, label: "50%" },
        { value: 100, label: "100%" },
      ],
    },
  ],
} satisfies FormField;

export function getDeal(adType: AdTypes): FieldSection {
  let deal: FormField[] = [];

  switch (adType) {
    case AdTypes.RentLong: {
      deal = [{ ...deposit }, { ...utilitiesFee }, { ...agentFee }];
      break;
    }
    case AdTypes.RentShort: {
      deal = [{ ...deposit }];
      break;
    }
    case AdTypes.Sell: {
      deal = [{ ...bargain }];
      break;
    }
  }

  const placeholder: Record<AdTypes, string> = {
    rent_long: "₽ / в месяц",
    rent_short: "₽ / за сутки",
    sell: "₽",
  };

  return {
    label: "Цена и условия сделки",
    fields: [
      {
        name: "deal.price",
        type: "number",
        placeholder: placeholder[adType],
      },
      ...deal,
    ],
  };
}
