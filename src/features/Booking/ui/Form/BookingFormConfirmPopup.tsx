import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { BookingForm } from "./BookingForm";
import { DateRangeType } from "../../types/date.types";

interface BookingFormConfirmPopupProps {
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

export const BookingFormConfirmPopup = ({
  isOpen,
  onClose,
  adId,
  dates,
  countDays,
  prepayment,
  remainder,
  totalPrice,
  price,
}: BookingFormConfirmPopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col lg:flex-row w-full h-full md:max-w-[900px] lg:max-h-[700px] p-0 lg:rounded-xl bg-white border-0">
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
