import Link from "next/link";
import { ReactNode, MouseEvent } from "react";

type MenuOption = {
  href: string;
  Svg: ReactNode;
  onClick?: (e: MouseEvent) => void;
};

interface HeaderMenuProps {
  options: MenuOption[];
}

export const HeaderMenu = ({ options }: HeaderMenuProps) => {
  return (
    <menu>
      <ul className="flex items-center gap-2">
        {options.map((option) => (
          <li key={option.href}>
            <Link
              href={option.href}
              onClick={option?.onClick ? option.onClick : undefined}
              className="flex items-center gap-4 hover:bg-blue-50 transition-colors duration-300 px-2 py-2 rounded-md text-sm"
            >
              {option.Svg}
            </Link>
          </li>
        ))}
      </ul>
    </menu>
  );
};
