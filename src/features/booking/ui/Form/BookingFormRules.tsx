interface BookingFormRulesProps {
  checkIn: string | undefined;
  checkOut: string | undefined;
}

export const BookingFormRules = ({
  checkIn,
  checkOut,
}: BookingFormRulesProps) => {
  return (
    <div className="flex flex-col gap-1 text-sm mb-4">
      <p> Заезд {checkIn}, после 15:00</p>
      <p> Выезд {checkOut}, до 12:00</p>
      <p> 2 взрослых</p>
    </div>
  );
};
