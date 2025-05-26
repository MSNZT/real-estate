import { z } from "zod";
import { BASE_MESSAGE } from "../consts/consts";

export const houseSchema = z.object({
  plotArea: z.number({ message: BASE_MESSAGE }),
  areaType: z.string({ message: BASE_MESSAGE }),
  plotHouse: z.number({ message: BASE_MESSAGE }).min(10),
  totalFloor: z.number({ message: BASE_MESSAGE }).min(1),
  houseType: z.string({ message: BASE_MESSAGE }),
  houseMaterialType: z.string({ message: BASE_MESSAGE }),
  toilet: z.string({ message: BASE_MESSAGE }),
  shower: z.string({ message: BASE_MESSAGE }),
});
