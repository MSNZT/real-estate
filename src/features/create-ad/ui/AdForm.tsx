import { Button } from "@/shared/ui";
import { AdFormSection } from "./AdFormSection";
import { AdFormData, FormFieldSection } from "../types/types";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDynamicSchema } from "../schema/baseSchema";
import { getDefaultValues } from "../utils/getDefaultValues";
import { generateAdTitle } from "@/entities/ad/utils/generateAdTitle";
import { AdTypes, PropertyTypes } from "@/shared/config/apollo/generated";
import { AddressBlock } from "./AddressBlock";
import { useMutation } from "@apollo/client";
import { CREATE_AD } from "@/shared/config/apollo/requests/createAd";
import toast from "react-hot-toast";
import { useAuth } from "@/entities/user";
import { useAuthRequired } from "@/app/providers/AuthRequiredProvider";
import { useMemo, useState } from "react";
import { contacts } from "../config/contacts";
import { useRouter } from "next/navigation";

interface AdFormProps {
  formConfig: FormFieldSection;
  adType: AdTypes;
  propertyType: PropertyTypes;
}

export const AdForm = ({ formConfig, adType, propertyType }: AdFormProps) => {
  const [stepAdForm, setStepAdForm] = useState(1);
  const { isAuth } = useAuth();
  const { handleOpenPopup } = useAuthRequired();
  const [createAd] = useMutation(CREATE_AD, {
    onCompleted: () => {
      toast.success("Объявление успешно создано");
    },
  });
  const router = useRouter();

  const methods = useForm<AdFormData>({
    resolver: zodResolver(
      createDynamicSchema(propertyType, adType, stepAdForm)
    ),
    defaultValues: getDefaultValues(formConfig, adType, propertyType),
    mode: "onSubmit",
  });

  console.log(methods.getValues());

  console.log("errors", methods.formState.errors);

  async function onSubmit(data: AdFormData) {
    console.log(data);

    if (isAuth) {
      const title = generateAdTitle(propertyType, data);
      const objData = {
        ...data,
        mainPhoto: data.photos[0],
        title,
      };

      const response = await createAd({
        variables: {
          createAdInput: {
            ...objData,
            adType,
            // propertyType,
          },
        },
      });

      router.push(`/offer/${response.data.createAd.id}`);
    } else {
      handleOpenPopup();
    }
  }

  async function handleNextStep() {
    const isValid = await methods.trigger();
    if (isValid) {
      if (isAuth) {
        setStepAdForm(2);
      } else {
        handleOpenPopup();
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <AddressBlock />
        <div className="flex flex-col gap-7 mt-5 mb-5">
          {formConfig.section.map((section) => (
            <AdFormSection
              key={section.label}
              section={section}
              stepAdForm={stepAdForm}
            />
          ))}
        </div>
        {stepAdForm === 2 && (
          <AdFormSection section={contacts} stepAdForm={stepAdForm} />
        )}
        {stepAdForm === 1 && (
          <Button
            className="bg-primary hover:bg-chart-2 text-white"
            type="button"
            onClick={handleNextStep}
          >
            Продолжить
          </Button>
        )}
        {stepAdForm === 2 && (
          <Button
            className="bg-primary hover:bg-chart-2 text-white mt-4"
            type="submit"
          >
            Создать объявление
          </Button>
        )}
      </form>
    </FormProvider>
  );
};
