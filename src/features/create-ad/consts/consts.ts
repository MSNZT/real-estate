import { AdTypeEnum, PropertyTypeEnum } from "../types/types";

type OptionType<T extends AdTypeEnum | PropertyTypeEnum> = {
  value: T;
  label: string;
};

export const AD_TYPES: OptionType<AdTypeEnum>[] = [
  { value: AdTypeEnum.SELL, label: "Продать" },
  { value: AdTypeEnum.SHORT_RENT, label: "Сдать посуточно" },
  { value: AdTypeEnum.LONG_RENT, label: "Сдать длительно" },
] as const;

export const PROPERTY_TYPES: OptionType<PropertyTypeEnum>[] = [
  { value: PropertyTypeEnum.APARTMENT, label: "Квартира" },
  { value: PropertyTypeEnum.HOUSE, label: "Дом" },
  // { value: PropertyTypeEnum.GARAGE, label: "Гараж" },
] as const;

export const ALLOWED_AD_TYPES = {};

export const ALLOWED_PROPERTY_TYPES: Record<
  AdTypeEnum,
  Partial<PropertyTypeEnum>[]
> = {
  [AdTypeEnum.SELL]: [
    PropertyTypeEnum.APARTMENT,
    // PropertyTypeEnum.GARAGE,
    PropertyTypeEnum.HOUSE,
  ],
  [AdTypeEnum.SHORT_RENT]: [PropertyTypeEnum.APARTMENT, PropertyTypeEnum.HOUSE],
  [AdTypeEnum.LONG_RENT]: [
    PropertyTypeEnum.APARTMENT,
    // PropertyTypeEnum.GARAGE,
    PropertyTypeEnum.HOUSE,
  ],
};

export const BASE_MESSAGE = "Обязательно для заполнения";
