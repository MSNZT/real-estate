import { type EstateConfigType } from "../types/types";
import { apartment } from "./apartment";
import { getDeal } from "./deal";
import { house } from "./house";
import { getFeatures } from "./features";
import { AdTypes, PropertyTypes } from "@/shared/config/apollo/generated";
import { file } from "./file";

export const estateConfig: EstateConfigType = {
  [AdTypes.RentShort]: {
    apartment: {
      section: [
        ...apartment.section,
        getFeatures(AdTypes.RentShort, PropertyTypes.Apartment),
        file,
        getDeal(AdTypes.RentShort),
      ],
    },
    house: {
      section: [
        ...house.section,
        getFeatures(AdTypes.RentShort, PropertyTypes.House),
        file,
        getDeal(AdTypes.RentShort),
      ],
    },
  },
  [AdTypes.RentLong]: {
    apartment: {
      section: [
        ...apartment.section,
        getFeatures(AdTypes.RentLong, PropertyTypes.Apartment),
        file,
        getDeal(AdTypes.RentLong),
      ],
    },
    house: {
      section: [
        ...house.section,
        getFeatures(AdTypes.RentLong, PropertyTypes.House),
        file,
        getDeal(AdTypes.RentLong),
      ],
    },
  },
  [AdTypes.Sell]: {
    apartment: {
      section: [
        ...apartment.section,
        getFeatures(AdTypes.Sell, PropertyTypes.Apartment),
        file,
        getDeal(AdTypes.Sell),
      ],
    },
    house: {
      section: [
        ...house.section,
        getFeatures(AdTypes.Sell, PropertyTypes.House),
        file,
        getDeal(AdTypes.Sell),
      ],
    },
  },
};
