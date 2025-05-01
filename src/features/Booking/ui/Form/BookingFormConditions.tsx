interface BookingFormConditionsProps {
  countDays: number | undefined;
  price: number;
  totalPrice: string | undefined;
  prepayment: string | undefined;
  remainder: string | undefined;
}

export const BookingFormConditions = ({
  countDays,
  prepayment,
  remainder,
  totalPrice,
  price,
}: BookingFormConditionsProps) => {
  console.log(123, price);

  return (
    <div className="flex flex-col gap-1 mt-auto mb-4">
      <h3 className="font-semibold text-xl">Оплата</h3>
      <div className="flex font-bold">
        <p>
          {price} ₽ × {countDays} суток
        </p>
        <div className="border-b border-dashed border-gray-400 flex-1 mx-1 -translate-y-[5px]"></div>
        <p>{totalPrice}</p>
      </div>
      <div className="flex text-sm text-gray-500">
        <p>Предоплата картой</p>
        <div className="border-b border-dashed border-gray-400 flex-1 mx-1 -translate-y-[5px]"></div>
        <p>{prepayment}</p>
      </div>
      <div className="flex text-sm text-gray-500">
        <p>Оплата при заселении</p>
        <div className="border-b border-dashed border-gray-400 flex-1 mx-1 -translate-y-[5px]"></div>
        <p>{remainder}</p>
      </div>
    </div>
  );
};
