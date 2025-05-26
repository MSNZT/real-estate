import { z } from "zod";
import { BASE_MESSAGE } from "../consts/consts";

const currentYear = new Date().getFullYear();

export const apartmentSchema = z.object({
  rooms: z.string({ message: BASE_MESSAGE }),
  bathroom: z.string({ message: BASE_MESSAGE }),
  renovation: z.string({ message: BASE_MESSAGE }),
  ceilingHeight: z.number({ message: BASE_MESSAGE }).min(2),
  floor: z.number({ message: BASE_MESSAGE }).min(1),
  totalFloor: z.number({
    message: BASE_MESSAGE,
  }),
  yearBuilt: z
    .number({ message: BASE_MESSAGE })
    .min(1800, { message: "Минимальный год постройки 1746" })
    .max(currentYear, { message: `Максимальный год постройки ${currentYear}` }),
  parkingType: z.string({ message: BASE_MESSAGE }),
  totalArea: z.number({ message: BASE_MESSAGE }),
  kitchenArea: z.number({ message: BASE_MESSAGE }),
  livingArea: z.number({
    message: BASE_MESSAGE,
  }),
});
