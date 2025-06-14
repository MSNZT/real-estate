import { Container } from "@/shared/ui";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderContent } from "./HeaderContent";
import { CityButton } from "@/features/city-button";
import { cn } from "@/shared/lib/utils";

export const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={cn(
        "border-b border-b-slate-200 h-[60px] md:h-[70px]",
        className
      )}
    >
      <Container className="flex items-center gap-3 h-full">
        <div className="flex items-center gap-4 md:mr-auto">
          <HeaderLogo />
          <CityButton city={"Москва"} />
        </div>
        <HeaderContent />
      </Container>
    </header>
  );
};
