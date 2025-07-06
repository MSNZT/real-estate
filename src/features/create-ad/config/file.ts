import { FieldSection } from "../types/types";

export const file: FieldSection = {
  label: "Фотографии",
  description:
    "Сфотографируйте все помещения, вид из окон, дом со стороны, участок и дополнительные постройки. Не используйте скриншоты. Максимум 10 фотографий, каждая фотография не более 2 мб.",
  fields: [
    {
      type: "file",
      name: "photos",
      limit: 10,
    },
  ],
};
