export const DatePickerHeaderMobile = ({ monthDate }: { monthDate: Date }) => {
  const monthName = new Date(monthDate).toLocaleDateString("ru-RU", {
    month: "long",
  });

  return <h3 className="first-letter:uppercase font-bold">{monthName}</h3>;
};
