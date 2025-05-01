const monthLocale = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export function getDateValue({
  from,
  to,
}: {
  from?: Date | null;
  to?: Date | null;
}) {
  const hasFrom = from != null;
  const hasTo = to != null;

  if (hasFrom && hasTo) {
    const fromMonth = from.getMonth();
    const toMonth = to.getMonth();

    if (fromMonth === toMonth) {
      return `${from.getDate()} - ${to.getDate()} ${monthLocale[fromMonth]}`;
    }
    if (from < to) {
      return `${from.getDate()} ${monthLocale[fromMonth]} - ${to.getDate()} ${monthLocale[toMonth]}`;
    }
  }

  if (hasFrom) return `${from.getDate()} ${monthLocale[from.getMonth()]} `;
  if (hasTo) return `${to.getDate()} ${monthLocale[to.getMonth()]} `;
}
