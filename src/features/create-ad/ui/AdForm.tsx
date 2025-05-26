import { Button } from "@/shared/ui";
import { AdFormSection } from "./AdFormSection";
import { AdFormData, FormFieldSection } from "../types/types";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDynamicSchema } from "../schema/baseSchema";
import { getDefaultValues } from "../utils/getDefaultValues";
import { getAdTitle } from "@/entities/ad/utils/getAdTitle";
import { AdTypes, PropertyTypes } from "@/shared/config/apollo/generated";
import { AddressBlock } from "./AddressBlock";
import { useLocationData } from "@/entities/user/store/useLocationData";
import { useMutation } from "@apollo/client";
import { CREATE_AD } from "@/shared/config/apollo/requests/createAd";
import toast from "react-hot-toast";

interface AdFormProps {
  formConfig: FormFieldSection;
  adType: AdTypes;
  propertyType: PropertyTypes;
}

export const AdForm = ({ formConfig, adType, propertyType }: AdFormProps) => {
  const [createAd] = useMutation(CREATE_AD, {
    onCompleted: () => {
      toast.success("Объявление успешно создано");
    },
  });
  const city = useLocationData((state) => state.city);
  const methods = useForm<AdFormData>({
    resolver: zodResolver(createDynamicSchema(propertyType, adType)),
    defaultValues: getDefaultValues(formConfig, adType, propertyType, city),
    mode: "onSubmit",
  });

  console.log("errors", methods.formState.errors);

  function onSubmit(data: AdFormData) {
    console.log(data);

    const title = getAdTitle(propertyType, data);
    const objData = {
      ...data,
      mainPhoto: data.photos[0],
      title,
    };

    createAd({
      variables: {
        createAdInput: {
          ...objData,
        },
      },
    });
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="mb-20 md:mb-0">
        <AddressBlock />
        <div className="flex flex-col gap-7 mt-5 mb-5">
          {formConfig.section.map((section) => (
            <AdFormSection key={section.label} section={section} />
          ))}
        </div>
        <Button
          className="bg-primary hover:bg-primary-dark text-white"
          type="submit"
        >
          Создать объявление
        </Button>
      </form>
    </FormProvider>
  );
};
