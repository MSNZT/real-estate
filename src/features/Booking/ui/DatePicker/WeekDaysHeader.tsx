export const WeekDaysHeader = ({
  locale,
}: {
  locale: Intl.LocalesArgument;
}) => {
  const weekDayNames: string[] = [];
  const date = new Date("2024-04-01");

  for (let i = 0; i < 7; i++) {
    weekDayNames.push(
      date.toLocaleDateString(locale, {
        weekday: "short",
      })
    );
    date.setDate(date.getDate() + 1);
  }

  if (!weekDayNames.length) return null;
  return (
    <div className="flex justify-center mb-2">
      {weekDayNames.map((name) => (
        <div
          key={name}
          className="w-11 text-[#999] first-letter:uppercase text-sm text-center"
        >
          {name}
        </div>
      ))}
    </div>
  );
};
