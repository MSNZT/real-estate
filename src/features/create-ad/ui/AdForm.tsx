import { Button } from "@/shared/ui";
import { AdFormSection } from "./AdFormSection";
import {
  AdFormData,
  AdTypeEnum,
  FormFieldSection,
  PropertyTypeEnum,
} from "../types/types";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDynamicSchema } from "../schema/baseSchema";
import { getDefaultValues } from "../utils/getDefaultValues";

interface AdFormProps {
  formConfig: FormFieldSection;
  adType: AdTypeEnum;
  propertyType: PropertyTypeEnum;
}

export const AdForm = ({ formConfig, adType, propertyType }: AdFormProps) => {
  const methods = useForm<AdFormData>({
    resolver: zodResolver(createDynamicSchema(propertyType, adType)),
    // defaultValues: {
    //   amenities: [],
    //   deal: {},
    // },
    defaultValues: getDefaultValues(formConfig, adType, propertyType),
  });

  // console.log("test", getDefaultValues(formConfig, adType, propertyType));

  // console.log(methods.getValues());
  // console.log("errors", methods.formState.errors);

  function onSubmit(e) {
    console.log(e);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="mb-20 md:mb-0">
        <div className="flex flex-col gap-7 mt-5 mb-5">
          {formConfig.section.map((section) => (
            <AdFormSection key={section.label} section={section} />
          ))}
        </div>
        <Button type="submit">Создать объявление</Button>
      </form>
    </FormProvider>
  );
};
