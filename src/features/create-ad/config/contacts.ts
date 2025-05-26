import { FieldSection } from "../types/types";

export const contacts = {
  label: "Контакты",
  description: "Для редактировании анкеты, перейдите в профиль",
  fields: [
    {
      label: "Как обращаться",
      type: "text",
      disabled: true,
      name: "contact.name",
    },
    {
      label: "Эл. почта",
      type: "text",
      disabled: true,
      name: "contact.email",
    },
    {
      label: "Ваш телефон",
      type: "text",
      disabled: true,
      name: "contact.phone",
    },
    {
      label: "Способ связи",
      type: "radio",
      name: "contact.communication",
      options: [
        { label: "Только звонки", value: "calls-only" },
        { label: "Звонки и сообщения", value: "calls-and-message" },
        { label: "Только сообщения", value: "message-only" },
      ],
    },
  ],
} satisfies FieldSection;
