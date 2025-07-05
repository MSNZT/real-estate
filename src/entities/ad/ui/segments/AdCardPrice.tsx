export const AdCardPrice = ({
  price,
  period,
}: {
  price: string;
  period: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xl font-extrabold">
        {price} {period}
      </span>
    </div>
  );
};
