import {
  AdTypeEnum,
  FieldSection,
  FormField,
  PropertyTypeEnum,
  type FormFieldSection,
} from "../types/types";

const featuresBase = {
  section: [
    {
      label: "Удобства и подробности",
      description:
        "Расскажите о недвижимости, инфраструктуре и районе. Пожалуйста, постарайтесь не использовать слова и выражения, которые могут кого-то обидеть. Не менее 30 и не более 1000 символов.",
      fields: [
        {
          type: "textarea",
          placeholder: "Опишите недвижимость",
          name: "description",
        },
      ],
    },
  ],
} satisfies FormFieldSection;

const apartmentBaseFeatures = {
  options: [
    { label: "Интернет", value: "internet" },
    { label: "Холодильник", value: "fridge" },
    { label: "Мебель на кухне", value: "furniture-kitchen" },
    { label: "Кондиционер", value: "air-conditioner" },
    { label: "Мебель в квартире", value: "furniture-apartment" },
    { label: "Лифт", value: "lift" },
    { label: "Мусоропровод", value: "garbage-chute" },
    { label: "Консьерж", value: "concierge" },
    { label: "Закрытая территория", value: "closed-area" },
  ],
};

export function getFeatures(
  adType: AdTypeEnum,
  propertyType: PropertyTypeEnum
): FieldSection {
  let features: FormField;

  switch (propertyType) {
    case PropertyTypeEnum.APARTMENT: {
      if (adType === AdTypeEnum.SELL) {
        features = {
          type: "checkbox",
          name: "amenities",
          options: [...apartmentBaseFeatures.options],
        };
        break;
      }
      features = {
        type: "checkbox",
        name: "amenities",
        options: [
          ...apartmentBaseFeatures.options,
          { label: "Стиральная машинка", value: "washing-machine" },
          { label: "Посудомойка", value: "dishwasher" },
          { label: "Можно с животными", value: "pets-allowed" },
          { label: "Можно с детьми", value: "kids-allowed" },
          { label: "Телевизор", value: "tv" },
        ],
      };
      break;
    }
    case PropertyTypeEnum.HOUSE: {
      features = {
        type: "checkbox",
        name: "amenities",
        options: [
          { label: "Канализация", value: "sewage" },
          { label: "Электросеть", value: "electric-network" },
          { label: "Газ", value: "gas" },
          { label: "Бильярд", value: "billiards" },
          { label: "Сауна", value: "sauna" },
          { label: "Бассейн", value: "pool" },
          { label: "Кухня", value: "kitchen" },
          { label: "Отопление", value: "heating" },
          { label: "Водопровод", value: "water-supply" },
        ],
      };
      break;
    }
  }
  const fields = [...featuresBase.section[0].fields, features];
  return {
    ...featuresBase.section[0],
    fields,
  };
}
