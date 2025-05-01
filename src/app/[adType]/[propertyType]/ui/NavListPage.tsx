"use client";
import Link from "next/link";
import { type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/shared/ui";

export const NavListPage = () => {
  const navlinkItems = [
    { text: "Купить", href: "/sell/apartment" },
    { text: "Снять", href: "/rent/apartment" },
  ];
  const pathname = usePathname();

  function handleClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (pathname === href) e.preventDefault();
  }

  return (
    <nav className="my-5">
      <Container>
        <ul className="flex items-center gap-4">
          {navlinkItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={(e) => handleClick(e, item.href)}>
                <span
                  className={cn({
                    "underline underline-offset-4": pathname === item.href,
                  })}
                >
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
};
