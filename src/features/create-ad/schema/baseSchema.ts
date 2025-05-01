import { z } from "zod";
import { AdTypeEnum, PropertyTypeEnum } from "../types/types";
import { apartmentSchema } from "./apartmentSchema";
import { houseSchema } from "./houseSchema";
import { getDealSchema } from "./dealSchema";

export const baseSchema = z.object({
  description: z
    .string({ message: "Обязательно для заполнения" })
    .min(30, { message: "Минимальное количество символов 30" })
    .max(500, { message: "Максимальное количество символов 500" }),
  amenities: z.array(z.string()).min(1, "Необходимо добавить хотя бы 1 поле"),
});

export function createDynamicSchema(
  propertyType: PropertyTypeEnum,
  adType: AdTypeEnum
) {
  return baseSchema.merge(
    z.object({
      propertyDetails: z.object({
        fields: getPropertyTypeSchema(propertyType),
      }),
      deal: getDealSchema(adType),
    })
  );
}

function getPropertyTypeSchema(propertyType: PropertyTypeEnum) {
  switch (propertyType) {
    case PropertyTypeEnum.APARTMENT: {
      return apartmentSchema;
    }
    case PropertyTypeEnum.HOUSE: {
      return houseSchema;
    }
    default:
      throw new Error(`Не поддерживаемый тип недвижимости: ${propertyType}`);
  }
}
