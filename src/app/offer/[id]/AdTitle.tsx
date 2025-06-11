interface AdTitleProps {
  title: string;
  price: string;
  period: string;
}

export const AdTitle = ({ title, price, period }: AdTitleProps) => {
  return (
    <div className="flex flex-col gap-1 font-medium w-full">
      <h2 className="text-2xl font-normal">{title}</h2>
      <p className="text-xl font-semibold">{price + " " + period}</p>
    </div>
  );
};
