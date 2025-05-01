import {
  AdTypeEnum,
  PropertyTypeEnum,
  type EstateConfigType,
} from "../types/types";
import { apartment } from "./apartment";
import { contacts } from "./contacts";
import { getDeal } from "./deal";
import { house } from "./house";
import { getFeatures } from "./features";

export const estateConfig: EstateConfigType = {
  [AdTypeEnum.SHORT_RENT]: {
    apartment: {
      section: [
        ...apartment.section,
        getDeal(AdTypeEnum.SHORT_RENT),
        getFeatures(AdTypeEnum.SHORT_RENT, PropertyTypeEnum.APARTMENT),
        contacts,
      ],
    },
    house: {
      section: [
        ...house.section,
        getDeal(AdTypeEnum.SHORT_RENT),
        getFeatures(AdTypeEnum.SHORT_RENT, PropertyTypeEnum.HOUSE),
        contacts,
      ],
    },
  },
  [AdTypeEnum.LONG_RENT]: {
    apartment: {
      section: [
        ...apartment.section,
        getDeal(AdTypeEnum.LONG_RENT),
        getFeatures(AdTypeEnum.SHORT_RENT, PropertyTypeEnum.APARTMENT),
        contacts,
      ],
    },
    house: {
      section: [
        ...house.section,
        getDeal(AdTypeEnum.LONG_RENT),
        getFeatures(AdTypeEnum.SHORT_RENT, PropertyTypeEnum.HOUSE),
        contacts,
      ],
    },
  },
  [AdTypeEnum.SELL]: {
    apartment: {
      section: [
        ...apartment.section,
        getDeal(AdTypeEnum.SELL),
        getFeatures(AdTypeEnum.SELL, PropertyTypeEnum.APARTMENT),
        contacts,
      ],
    },
    house: {
      section: [
        ...house.section,
        getDeal(AdTypeEnum.SELL),
        getFeatures(AdTypeEnum.SELL, PropertyTypeEnum.HOUSE),
        contacts,
      ],
    },
  },
};
