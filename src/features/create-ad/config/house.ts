import { type FormFieldSection } from "../types/types";

export const house = {
  section: [
    {
      label: "О доме",
      fields: [
        {
          name: "propertyDetails.fields.plotHouse",
          label: "Площадь, м²",
          type: "number",
        },
        {
          name: "propertyDetails.fields.totalFloor",
          label: "Количество этажей",
          type: "number",
        },
        {
          name: "propertyDetails.fields.houseType",
          label: "Тип дома",
          type: "radio",
          options: [
            { value: "Отдельный дом", label: "Отдельный дом" },
            { value: "Часть дома", label: "Часть дома" },
            { value: "Танхаус", label: "Танхаус" },
            { value: "Дуплекс", label: "Дуплекс" },
          ],
        },
        {
          name: "propertyDetails.fields.houseMaterialType",
          label: "Материал",
          type: "radio",
          options: [
            { value: "Кирпичный", label: "Кирпичный" },
            { value: "Монолитный", label: "Монолитный" },
            { value: "Панельный", label: "Панельный" },
            { value: "Кирпично-монолитный", label: "Кирпично-монолитный" },
            { value: "Блочный", label: "Блочный" },
            { value: "Деревянный", label: "Деревянный" },
            { value: "Железобетонный", label: "Железобетонный" },
          ],
        },
        {
          name: "propertyDetails.fields.toilet",
          label: "Санузел",
          type: "radio",
          options: [
            { value: "В доме", label: "В доме" },
            { value: "На улице", label: "На улице" },
            { value: "Отсутствует", label: "Отсутствует" },
          ],
        },
        {
          name: "propertyDetails.fields.shower",
          label: "Душ",
          type: "radio",
          options: [
            { value: "В доме", label: "В доме" },
            { value: "На улице", label: "На улице" },
            { value: "Отсутствует", label: "Отсутствует" },
          ],
        },
      ],
    },
    {
      label: "О участке",
      fields: [
        {
          name: "propertyDetails.fields.plotArea",
          label: "Площадь участка",
          type: "number",
          placeholder: "Cоток",
        },
        {
          name: "propertyDetails.fields.areaType",
          label: "Тип участка",
          type: "radio",
          options: [
            { value: "ИЖС", label: "ИЖС" },
            { value: "Садовый", label: "Садовый" },
            { value: "Фермерский", label: "Фермерский" },
          ],
        },
      ],
    },
  ],
} satisfies FormFieldSection;
