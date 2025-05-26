import { PropertyTypes } from "@/shared/config/apollo/generated";
import { AdFormData } from "../types/types";

export function getAdTitle(
  propertyType: PropertyTypes,
  data: AdFormData
): string {
  switch (propertyType) {
    case PropertyTypes.House: {
      const fields = data.propertyDetails.fields;
      return `Дом ${fields.plotArea} м² на участке ${fields.plotArea} соток`;
    }
    case PropertyTypes.Apartment: {
      const fields = data.propertyDetails.fields;
      return `${fields.totalArea} м², ${fields.rooms}-к. квартира, ${fields.floor}/${fields.totalFloor} этаж`;
    }
  }
}
