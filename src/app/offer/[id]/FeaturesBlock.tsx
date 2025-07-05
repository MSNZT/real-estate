"use client";
import { Ad } from "@/shared/config/apollo/generated";
import {
  Armchair,
  ConciergeBell,
  PawPrint,
  Plug,
  Trash,
  Tv,
} from "lucide-react";
import { ReactElement, useState } from "react";
import { FaFire, FaWifi } from "react-icons/fa";
import {
  TbAirConditioning,
  TbElevator,
  TbFridge,
  TbMoodKid,
} from "react-icons/tb";
import { GiGate, GiLeadPipe, GiWashingMachine } from "react-icons/gi";
import { LuWashingMachine } from "react-icons/lu";
import { RiBilliardsFill } from "react-icons/ri";
import { MdOutlinePool } from "react-icons/md";
import { Calendar } from "@/shared/ui/calendar";
import { DateRange } from "react-day-picker";

const featuresDictionary: Record<
  string,
  { text: string; icon: ReactElement | null }
> = {
  internet: { text: "Интернет", icon: <FaWifi size={18} /> },
  lift: { text: "Лифт", icon: <TbElevator size={20} /> },
  fridge: { text: "Холодильник", icon: <TbFridge size={20} /> },
  "furniture-kitchen": { text: "Мебель на кухне", icon: null },
  "air-conditioner": {
    text: "Кондиционер",
    icon: <TbAirConditioning size={20} />,
  },
  "furniture-apartment": {
    text: "Мебель в квартире",
    icon: <Armchair size={20} />,
  },
  "garbage-chute": { text: "Мусоропровод", icon: <Trash size={18} /> },
  concierge: { text: "Консьерж", icon: <ConciergeBell size={20} /> },
  "closed-area": { text: "Закрытая территория", icon: <GiGate size={18} /> },
  "washing-machine": {
    text: "Стиральная машина",
    icon: <GiWashingMachine size={18} />,
  },
  dishwasher: { text: "Посудомойка", icon: <LuWashingMachine size={18} /> },
  "pets-allowed": { text: "Можно с животными", icon: <PawPrint size={18} /> },
  "kids-allowed": { text: "Можно с детьми", icon: <TbMoodKid size={18} /> },
  tv: { text: "Телевизор", icon: <Tv size={18} /> },
  sewage: { text: "Канализация", icon: <GiLeadPipe size={18} /> },
  "electric-network": { text: "Электроснабжение", icon: <Plug size={18} /> },
  gas: { text: "Газ", icon: <FaFire size={18} /> },
  billiards: { text: "Бильярд", icon: <RiBilliardsFill size={18} /> },
  sauna: { text: "Сауна", icon: null },
  pool: { text: "Бассейн", icon: <MdOutlinePool size={18} /> },
  kitchen: { text: "Кухня", icon: null },
  heating: { text: "Отопление", icon: null },
  "water-supply": { text: "Водопровод", icon: null },
};

export const FeaturesBlock = ({ features }: { features: Ad["features"] }) => {
  const [range, setRange] = useState<DateRange | undefined>();
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();

  // Определяем диапазон, который нужно показать (с учётом "preview")
  const isSingleDaySelected =
    range?.from && range?.to && range.from.getTime() === range.to.getTime();

  // Для подсветки диапазона при наведении
  const getDisplayRange = (): DateRange | undefined => {
    if (
      range?.from &&
      isSingleDaySelected &&
      hoveredDate &&
      hoveredDate.getTime() !== range.from.getTime()
    ) {
      return { from: range.from, to: hoveredDate };
    }
    return range?.from && range?.to ? range : undefined;
  };

  // Корректный обработчик выбора диапазона
  const handleSelect: SelectRangeEventHandler = (selectedRange) => {
    if (!selectedRange) {
      setRange(undefined);
      setHoveredDate(undefined);
      return;
    }

    // Если уже выбран диапазон (две разные даты), следующий клик начинает новый диапазон
    if (
      range?.from &&
      range?.to &&
      range.from.getTime() !== range.to.getTime()
    ) {
      setRange({ from: selectedRange.from, to: selectedRange.from });
      setHoveredDate(undefined);
      return;
    }
    setRange(selectedRange);
    setHoveredDate(undefined);
  };

  // Наведение мыши для "preview"
  const handleDayMouseEnter = (date: Date) => {
    if (isSingleDaySelected) {
      setHoveredDate(date);
    }
  };

  const handleDayMouseLeave = () => {
    setHoveredDate(undefined);
  };

  // Сброс диапазона при клике после выбора (можешь не использовать, если не нужен полный сброс)
  const handleDayClick = (date: Date, modifiers: any, e: React.MouseEvent) => {
    if (
      range?.from &&
      range?.to &&
      range.from.getTime() !== range.to.getTime()
    ) {
      setRange({ from: date, to: date });
      setHoveredDate(undefined);
    }
  };
  return (
    <>
      <div className="max-w-[744px]">
        <p className="font-bold text-2xl mb-2">Особенности</p>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {features.map(
            (feature) =>
              featuresDictionary[feature] && (
                <li key={feature} className="flex items-center gap-2">
                  {featuresDictionary[feature].icon}
                  <span className="text-md">
                    {featuresDictionary[feature].text}
                  </span>
                </li>
              )
          )}
        </ul>
      </div>
      {/* <Calendar
        mode="range"
        defaultMonth={new Date()}
        numberOfMonths={2}
        showOutsideDays={false}
        className="rounded-lg border shadow-sm"
        disabled={{ before: new Date(), dayOfWeek: "05-07-2025" }}
        excludeDisabled
      /> */}
      <Calendar
        mode="range"
        selected={range}
        defaultMonth={new Date()}
        numberOfMonths={2}
        showOutsideDays={false}
        className="rounded-lg border shadow-sm"
        disabled={{ before: new Date() }}
        excludeDisabled
        onSelect={handleSelect}
        modifiers={{
          range_preview: getDisplayRange(),
        }}
        modifiersClassNames={{
          range_preview: "bg-accent/40", // Твой класс для preview-диапазона (можешь поменять)
        }}
        onDayMouseEnter={handleDayMouseEnter}
        onDayMouseLeave={handleDayMouseLeave}
        onDayClick={handleDayClick}
      />
    </>
  );
};
