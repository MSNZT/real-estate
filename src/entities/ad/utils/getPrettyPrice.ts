export const getPrettyPrice = (price: number | undefined) => {
  return price?.toLocaleString("ru-RU") + " ₽";
};
