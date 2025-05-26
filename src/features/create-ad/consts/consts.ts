import { AdTypes, PropertyTypes } from "@/shared/config/apollo/generated";

type OptionType<T extends AdTypes | PropertyTypes> = {
  value: T;
  label: string;
};

export const AD_TYPES: OptionType<AdTypes>[] = [
  { value: AdTypes.Sell, label: "Продать" },
  { value: AdTypes.RentShort, label: "Сдать посуточно" },
  { value: AdTypes.RentLong, label: "Сдать длительно" },
] as const;

export const PROPERTY_TYPES: OptionType<PropertyTypes>[] = [
  { value: PropertyTypes.Apartment, label: "Квартира" },
  { value: PropertyTypes.House, label: "Дом" },
  // { value: PropertyTypes.GARAGE, label: "Гараж" },
] as const;

export const ALLOWED_AD_TYPES = {};

export const ALLOWED_PROPERTY_TYPES: Record<AdTypes, Partial<PropertyTypes>[]> =
  {
    [AdTypes.Sell]: [
      PropertyTypes.Apartment,
      // PropertyTypes.GARAGE,
      PropertyTypes.House,
    ],
    [AdTypes.RentShort]: [PropertyTypes.Apartment, PropertyTypes.House],
    [AdTypes.RentLong]: [
      PropertyTypes.Apartment,
      // PropertyTypes.GARAGE,
      PropertyTypes.House,
    ],
  };

export const BASE_MESSAGE = "Обязательно для заполнения";
