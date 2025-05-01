import { Button } from "@/shared/ui";

interface GuestCountsProps {
  min: number;
  max: number;
  className?: string;
  guestCounts: number;
  incrementGuestCount: (max: number) => void;
  decrementGuestCount: (min: number) => void;
}

export const GuestCounts = ({
  min = 1,
  max,
  className,
  guestCounts,
  incrementGuestCount,
  decrementGuestCount,
}: GuestCountsProps) => {
  return (
    <div className={className}>
      <p className="font-semibold mb-1">
        Количество гостей: <span className="font-normal">(не более {max})</span>
      </p>
      <div className="flex items-center gap-6 p-1.5 px-3 rounded-lg bg-[#eee] max-w-[100px]">
        <Button
          className="text-xl"
          onClick={() => decrementGuestCount(min)}
          size="clear"
          variant="clear"
          disabled={guestCounts === min}
        >
          -
        </Button>
        <p>{guestCounts}</p>
        <Button
          className="text-xl"
          onClick={() => incrementGuestCount(max)}
          size="clear"
          variant="clear"
          disabled={guestCounts === max}
        >
          +
        </Button>
      </div>
    </div>
  );
};
