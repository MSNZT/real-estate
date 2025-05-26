import { AdTypes, PropertyTypes } from "@/shared/config/apollo/generated";
import { FormFieldSection } from "../types/types";
import { useAuthData } from "@/entities/user";
import { useLocationData } from "@/entities/user/store/useLocationData";

export const getDefaultValues = (
  config: FormFieldSection,
  adType: AdTypes,
  propertyType: PropertyTypes,
  city: string | null
) => {
  const userData = useAuthData((state) => state.userData);
  const location = useLocationData((state) => state.locationData);

  const defaultValues: Record<string, any> = {
    features: [],
    photos: [],
    adType,
    propertyType,
    location: {
      ...location,
    },
    contact: {
      name: userData?.name,
      phone: userData?.phone,
      email: userData?.email,
    },
  };

  // Доделать

  config.section.forEach((sec) => {
    sec.fields.forEach((field) => {
      if (field.type === "number") {
        const keys = field.name.split(".");
        let current = defaultValues;
        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            current[key] = "";
          } else {
            current[key] = current[key] || {};
          }
          current = current[key];
        });
      }
    });
  });

  return defaultValues;
};
