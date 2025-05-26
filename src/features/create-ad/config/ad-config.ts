import { type EstateConfigType } from "../types/types";
import { apartment } from "./apartment";
import { contacts } from "./contacts";
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
        contacts,
      ],
    },
    house: {
      section: [
        ...house.section,
        getFeatures(AdTypes.RentShort, PropertyTypes.House),
        file,
        getDeal(AdTypes.RentShort),
        contacts,
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
        contacts,
      ],
    },
    house: {
      section: [
        ...house.section,
        getFeatures(AdTypes.RentLong, PropertyTypes.House),
        file,
        getDeal(AdTypes.RentLong),
        contacts,
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
        contacts,
      ],
    },
    house: {
      section: [
        ...house.section,
        getFeatures(AdTypes.Sell, PropertyTypes.House),
        file,
        getDeal(AdTypes.Sell),
        contacts,
      ],
    },
  },
};
