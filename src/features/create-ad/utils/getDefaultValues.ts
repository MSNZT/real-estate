import { AdTypeEnum, FormFieldSection, PropertyTypeEnum } from "../types/types";

export const getDefaultValues = (
  config: FormFieldSection,
  adType: AdTypeEnum,
  propertyType: PropertyTypeEnum
) => {
  //   const baseDefaultValues = {
  //     description: "",
  //     propertyDetails: {
  //       fields: {},
  //     },
  //     deal: {
  //       //   price: "",
  //       fields: {},
  //     },
  //   };
  const defaultValues: Record<string, any> = {
    amenities: [],
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
            // console.log(current[key]);

            current[key] = current[key] || {};
          }
          current = current[key];
        });
      }
    });
  });

  return defaultValues;
};
