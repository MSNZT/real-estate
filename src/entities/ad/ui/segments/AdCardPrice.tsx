export const AdCardPrice = ({
  price,
  period,
}: {
  price: string;
  period: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-lg font-bold">
        {price} {period}
      </span>
    </div>
  );
};
