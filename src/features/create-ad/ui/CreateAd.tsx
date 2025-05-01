"use client";
import { Button, Container } from "@/shared/ui";
import { useState } from "react";
import { AdTypeEnum, PropertyTypeEnum } from "../types/types";
import {
  AD_TYPES,
  ALLOWED_PROPERTY_TYPES,
  PROPERTY_TYPES,
} from "../consts/consts";
import { cn } from "@/shared/lib/utils";
import { AdForm } from "./AdForm";
import { estateConfig } from "../config/ad-config";

export const CreateAd = () => {
  const [adType, setAdType] = useState<AdTypeEnum | null>(null);
  const [propertyType, setPropertyType] = useState<PropertyTypeEnum | null>(
    null
  );

  const getAllowedPropertyTypes = () => {
    return PROPERTY_TYPES.filter((property) =>
      ALLOWED_PROPERTY_TYPES[adType!].includes(property.value)
    );
  };

  return (
    <Container className="my-10">
      <div className="md:ml-20 max-w-[900px] mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Новое объявление
        </h2>
        <section className="flex max-w-[700px] gap-5 flex-wrap mb-5">
          <h3 className="text-2xl font-semibold mb-4 visually-hidden">
            Выберите тип объявления:
          </h3>
          {AD_TYPES.map((item) => (
            <Button
              key={item.value}
              variant="clear"
              size="clear"
              className={cn(
                "w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-gray-200 hover:bg-blue-400 hover:text-white duration-300 rounded-xl flex justify-center items-center text-base transition-all active:scale-95",
                {
                  "bg-blue-400 text-white": item.value === adType,
                }
              )}
              onClick={() => setAdType(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </section>

        {adType && (
          <section>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              Выберите тип недвижимости:
            </h3>
            <div className="flex max-w-[700px] gap-5 flex-wrap">
              {getAllowedPropertyTypes().map((item) => {
                return (
                  <Button
                    key={item.value}
                    variant="clear"
                    size="clear"
                    className={cn(
                      "w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-gray-200 hover:bg-blue-400 hover:text-white duration-300 rounded-xl flex justify-center items-center text-base transition-all active:scale-95",
                      {
                        "bg-blue-400 text-white": item.value === propertyType,
                      }
                    )}
                    onClick={() => setPropertyType(item.value)}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </section>
        )}
        {adType && propertyType && estateConfig[adType][propertyType] && (
          <AdForm
            formConfig={estateConfig[adType][propertyType]}
            adType={adType}
            propertyType={propertyType}
          />
        )}
      </div>
    </Container>
  );
};
