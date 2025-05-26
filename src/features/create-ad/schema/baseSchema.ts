import { z } from "zod";
import { apartmentSchema } from "./apartmentSchema";
import { houseSchema } from "./houseSchema";
import { getDealSchema } from "./dealSchema";
import { AdTypes, PropertyTypes } from "@/shared/config/apollo/generated";
import { contactSchema } from "./contactsSchema";

const locationSchema = z.object({
  city: z.string({ message: "Укажите город" }),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string({ message: "Укажите адрес" }),
});

export const baseSchema = z.object({
  adType: z.enum([AdTypes.RentLong, AdTypes.RentShort, AdTypes.Sell], {
    message: "Укажите тип объявления",
  }),
  propertyType: z.enum([PropertyTypes.Apartment, PropertyTypes.House], {
    message: "Укажите тип недвижимости",
  }),
  description: z
    .string({ message: "Обязательно для заполнения" })
    .min(30, { message: "Минимальное количество символов 30" })
    .max(500, { message: "Максимальное количество символов 500" }),
  features: z.array(z.string()).min(1, "Необходимо выбрать хотя бы 1 поле"),
  photos: z
    .array(z.string())
    .min(1, "Необходимо добавить хотя бы 1 фотографию")
    .max(10),
  location: locationSchema,
  contact: contactSchema,
});

export function createDynamicSchema(
  propertyType: PropertyTypes,
  adType: AdTypes
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

function getPropertyTypeSchema(propertyType: PropertyTypes) {
  switch (propertyType) {
    case PropertyTypes.Apartment: {
      return apartmentSchema;
    }
    case PropertyTypes.House: {
      return houseSchema;
    }
    default:
      throw new Error(`Не поддерживаемый тип недвижимости: ${propertyType}`);
  }
}
