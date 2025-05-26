import { Container } from "@/shared/ui";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderContent } from "./HeaderContent";
import { CityButton } from "@/features/city-button/ui/CityButton";

export const Header = () => {
  return (
    <header className="border-b border-b-slate-200 max-h-[81px]">
      <Container className="flex items-center gap-3 py-5">
        <div className="flex items-center gap-4 mr-auto">
          <HeaderLogo />
          <CityButton />
        </div>
        <HeaderContent />
      </Container>
    </header>
  );
};
