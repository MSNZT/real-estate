import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { BookingForm } from "./BookingForm";
import { DateRangeType } from "../../types/date.types";

interface BookingFormPopupProps {
  adId: string;
  dates: DateRangeType | undefined;
  countDays: number | undefined;
  price: number;
  totalPrice: string | undefined;
  prepayment: string | undefined;
  remainder: string | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingFormPopup = ({
  isOpen,
  onClose,
  adId,
  dates,
  countDays,
  prepayment,
  remainder,
  totalPrice,
  price,
}: BookingFormPopupProps) => {
  console.log("kek", price);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button className="w-full justify-center">Забронировать</Button>
      </DialogTrigger> */}
      <DialogContent className="flex flex-col lg:flex-row w-full h-full md:max-w-[900px] lg:max-h-[700px] overflow-y-auto p-0 lg:rounded-3xl">
        <BookingForm
          adId={adId}
          dates={dates}
          countDays={countDays}
          prepayment={prepayment}
          remainder={remainder}
          totalPrice={totalPrice}
          price={price}
        />
      </DialogContent>
    </Dialog>
  );
};
