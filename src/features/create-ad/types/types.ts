import { FormField } from "@/shared/ui/Form";
import { z } from "zod";
import { houseSchema } from "../schema/houseSchema";
import { apartmentSchema } from "../schema/apartmentSchema";
import { baseSchema } from "../schema/baseSchema";
import { getDealSchema } from "../schema/dealSchema";

export enum AdTypeEnum {
  SELL = "sell",
  SHORT_RENT = "short_rent",
  LONG_RENT = "long_rent",
}

export enum PropertyTypeEnum {
  APARTMENT = "apartment",
  HOUSE = "house",
  // GARAGE = "garage",
}

export type EstateConfigType = {
  [key in AdTypeEnum]: {
    [key in PropertyTypeEnum]: FormFieldSection;
  };
};

export type FieldSection = {
  label: string;
  fields: FormField[];
  description?: string;
};

export type FormFieldSection = {
  section: FieldSection[];
};

export type FormItemOption = {
  value: string | number | boolean;
  label: string;
};

export type FormField =
  | {
      type: "string";
      label?: string;
      name: string;
      placeholder?: string;
      disabled?: boolean;
    }
  | {
      type: "textarea";
      label?: string;
      name: string;
      placeholder?: string;
      disabled?: boolean;
    }
  | {
      type: "number";
      label?: string;
      name: string;
      placeholder?: string;
      disabled?: boolean;
    }
  | {
      type: "checkbox";
      label?: string;
      name: string;
      options: FormItemOption[];
    }
  | {
      type: "radio";
      label?: string;
      name: string;
      options: FormItemOption[];
    }
  | {
      type: "nested";
      label: string;
      nestedFields: FormField[];
    }
  | {
      type: "separator";
      content: string;
    };

type HouseSchemaType = z.infer<typeof houseSchema>;
type ApartmentSchemaType = z.infer<typeof apartmentSchema>;
type BaseSchemaType = z.infer<typeof baseSchema>;

type DealSchemaType<T extends AdTypeEnum> = z.infer<
  ReturnType<typeof getDealSchema> & { adType: T }
>;

type DealSchemaSell = DealSchemaType<AdTypeEnum.SELL>;
type DealSchemaShortRent = DealSchemaType<AdTypeEnum.SHORT_RENT>;
type DealSchemaLongRent = DealSchemaType<AdTypeEnum.LONG_RENT>;

export type AdFormData = BaseSchemaType & {
  propertyDetails: {
    fields: HouseSchemaType | ApartmentSchemaType;
  };
  deal: DealSchemaSell | DealSchemaShortRent | DealSchemaLongRent;
};
