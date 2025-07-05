import { AdTypes, PropertyTypes } from "@/shared/config/apollo/generated";
import { FormFieldSection } from "../types/types";
import { useAuth } from "@/entities/user";
import { useLocation } from "@/shared/hooks/use-location";

export const getDefaultValues = (
  config: FormFieldSection,
  adType: AdTypes,
  propertyType: PropertyTypes
) => {
  const { user } = useAuth();
  const location = useLocation((state) => state.location);

  const defaultValues: Record<string, any> = {
    features: [],
    photos: [],
    adType,
    propertyType,
    location: {
      ...location,
    },
    contact: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
    },
  };

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
