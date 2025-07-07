import { z } from "zod";
import { apartmentSchema } from "./apartmentSchema";
import { houseSchema } from "./houseSchema";
import { getDealSchema } from "./dealSchema";
import { AdTypes, PropertyTypes } from "@/shared/config/apollo/generated";
import { contactSchema } from "./contactsSchema";

const types = z.object({
  adType: z.enum([AdTypes.RentLong, AdTypes.RentShort, AdTypes.Sell], {
    message: "Укажите тип объявления",
  }),
  propertyType: z.enum([PropertyTypes.Apartment, PropertyTypes.House], {
    message: "Укажите тип недвижимости",
  }),
});

const locationSchema = z.object({
  city: z
    .string({ message: "Укажите город" })
    .nonempty({ message: "Поле город не может быть пустым" }),
  latitude: z.number(),
  longitude: z.number(),
  address: z
    .string({ message: "Укажите адрес" })
    .nonempty({ message: "Поле адрес не может быть пустым" }),
});

export const baseSchema = z.object({
  description: z
    .string({ message: "Обязательно для заполнения" })
    .min(30, { message: "Минимальное количество символов 30" })
    .max(1000, { message: "Максимальное количество символов 1000" }),
  features: z.array(z.string()).min(1, "Необходимо выбрать хотя бы 1 поле"),
  photos: z
    .array(z.string())
    .min(1, "Необходимо добавить хотя бы 1 фотографию")
    .max(10),
  location: locationSchema,
});

export function createDynamicSchema(
  propertyType: PropertyTypes,
  adType: AdTypes,
  stepAdForm: number
) {
  let schema = baseSchema.merge(
    z.object({
      propertyDetails: z.object({
        fields: getPropertyTypeSchema(propertyType),
      }),
      deal: getDealSchema(adType),
    })
  );

  if (stepAdForm >= 2) {
    schema = schema.extend({ contact: contactSchema, ...types.shape });
  }

  return schema;
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
