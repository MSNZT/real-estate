import { type FormFieldSection } from "../types/types";

export const apartment = {
  section: [
    {
      label: "О квартире",
      fields: [
        {
          name: "propertyDetails.fields.rooms",
          label: "Количество комнат",
          type: "radio",
          options: [
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
            { value: "6", label: "6" },
            { value: "7", label: "7+" },
          ],
        },
        {
          label: "Площадь м²",
          type: "nested",
          nestedFields: [
            {
              name: "propertyDetails.fields.totalArea",
              placeholder: "Общая",
              type: "number",
            },
            {
              name: "propertyDetails.fields.livingArea",
              placeholder: "Жилая ",
              type: "number",
            },
            {
              name: "propertyDetails.fields.kitchenArea",
              placeholder: "Кухня",
              type: "number",
            },
          ],
        },
        {
          label: "Этаж",
          type: "nested",
          nestedFields: [
            {
              name: "propertyDetails.fields.floor",
              type: "number",
              placeholder: "3",
            },
            {
              type: "separator",
              content: "из",
            },
            {
              name: "propertyDetails.fields.totalFloor",
              type: "number",
              placeholder: "20",
            },
          ],
        },
        {
          name: "propertyDetails.fields.bathroom",
          label: "Санузел",
          type: "radio",
          options: [
            { value: "Совмещённый", label: "Совмещённый" },
            { value: "Раздельный", label: "Раздельный" },
            { value: "Более 1", label: "Более 1" },
          ],
        },
        {
          name: "propertyDetails.fields.renovation",
          label: "Ремонт",
          type: "radio",
          options: [
            { value: "Косметический", label: "Косметический" },
            { value: "Евроремонт", label: "Евроремонт" },
            { value: "Дизайнерский", label: "Дизайнерский" },
            { value: "Требуется", label: "Требуется" },
          ],
        },
      ],
    },
    {
      label: "О доме",
      fields: [
        {
          name: "propertyDetails.fields.yearBuilt",
          label: "Год постройки",
          type: "number",
          placeholder: "1980",
        },
        {
          name: "propertyDetails.fields.ceilingHeight",
          label: "Высота потолков (м)",
          type: "number",
          placeholder: "2",
        },
        {
          name: "propertyDetails.fields.parkingType",
          label: "Тип парковки",
          type: "radio",
          options: [
            { value: "Открытая", label: "Открытая" },
            { value: "Закрытая", label: "Закрытая" },
            { value: "Подземная", label: "Подземная" },
            { value: "Отсутствует", label: "Отсутствует" },
          ],
        },
      ],
    },
  ],
} satisfies FormFieldSection;
