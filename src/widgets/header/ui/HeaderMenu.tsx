import { Heart, MessageSquare } from "lucide-react";
import Link from "next/link";

export const HeaderMenu = () => {
  return (
    <menu className="flex items-center gap-2">
      <Link
        href="/favorites"
        className="flex items-center gap-4 hover:bg-blue-50 transition-colors duration-300 px-2 py-2 rounded-md text-sm"
      >
        <Heart />
      </Link>
      <Link
        href="/chat"
        className="flex items-center gap-4 hover:bg-blue-50 transition-colors duration-300 px-2 py-2 rounded-md text-sm"
      >
        <MessageSquare />
      </Link>
      <Link
        href="/create-ad"
        className="flex items-center gap-4 bg-primary hover:bg-primary-dark transition-colors duration-300 px-4 py-2 rounded-md
              text-sm"
      >
        <span className="text-white">Разместить объявление</span>
      </Link>
    </menu>
  );
};
