import {
  Armchair,
  ConciergeBell,
  PawPrint,
  Plug,
  Trash,
  Tv,
} from "lucide-react";
import { ReactElement } from "react";
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

export const featuresDictionary: Record<
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
