import { FormField } from "@/shared/ui/Form";
import { z } from "zod";
import { houseSchema } from "../schema/houseSchema";
import { apartmentSchema } from "../schema/apartmentSchema";
import { baseSchema } from "../schema/baseSchema";
import { getDealSchema } from "../schema/dealSchema";
import { AdTypes, PropertyTypes } from "@/shared/config/apollo/generated";

export type EstateConfigType = {
  [key in AdTypes]: {
    [key in PropertyTypes]: FormFieldSection;
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
      type: "text";
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
      type: "file";
      name: string;
      limit: number;
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

type DealSchemaType<T extends AdTypes> = z.infer<
  ReturnType<typeof getDealSchema> & { adType: T }
>;

type DealSchemaSell = DealSchemaType<AdTypes.Sell>;
type DealSchemaShortRent = DealSchemaType<AdTypes.RentShort>;
type DealSchemaLongRent = DealSchemaType<AdTypes.RentLong>;

export type AdFormData = BaseSchemaType & {
  propertyDetails: {
    fields: HouseSchemaType | ApartmentSchemaType;
  };
  deal: DealSchemaSell | DealSchemaShortRent | DealSchemaLongRent;
};
