import { FieldSection } from "../types/types";

export const contacts = {
  label: "Контакты",
  description: "Для редактировании анкеты, перейдите в профиль",
  fields: [
    {
      label: "Как обращаться",
      type: "string",
      disabled: true,
      name: "contacts.name",
    },
    {
      label: "Эл. почта",
      type: "string",
      disabled: true,
      name: "contacts.email",
    },
    {
      label: "Ваш телефон",
      type: "string",
      disabled: true,
      name: "contacts.phone",
    },
    {
      label: "Способ связи",
      type: "radio",
      name: "contacts.communication",
      options: [
        { label: "Только звонки", value: "calls-only" },
        { label: "Звонки и сообщения", value: "calls-and-message" },
        { label: "Только сообщения", value: "message-only" },
      ],
    },
  ],
} satisfies FieldSection;
