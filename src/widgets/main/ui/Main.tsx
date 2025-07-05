// "use client";
import Link from "next/link";
import { Container, Icon } from "@/shared/ui";
// import { useAuthFromParams } from "@/entities/user";
import { CityPersistButton } from "@/features/city-button/ui/CityPersistButton";
import ApartmentIcon from "@/shared/assets/apartment-icon.svg";
import HouseIcon from "@/shared/assets/house-icon.svg";
import { CaterorySectionList } from "./CaterorySectionList";
import { AdsSectionType } from "@/app/(root)/data/data";

interface HeroProps {
  data: AdsSectionType[];
  city: string;
}

export function Hero({ data, city }: HeroProps) {
  // useAuthFromParams();

  return (
    <main>
      <Container className="mb-20 px-0 sm:px-5 pb-[65px] md:pb-0">
        <div className="mt-10 mb-5 sm:mt-10 md:mt-20">
          <h1 className="text-2xl md:text-3xl font-bold uppercase text-center px-3">
            Сервис поиска, аренды и продажи недвижимости
          </h1>
        </div>
        <div className="mx-auto">
          <div className="flex justify-center items-center gap-2 mb-5">
            <p className="text-md">Регион поиска:</p>
            <CityPersistButton cityName={city} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <nav className="mb-10">
            <ul className="flex gap-3">
              <li>
                <Link
                  className="group flex flex-col gap-2 items-center"
                  href="/ads/sell/apartment"
                >
                  <div className="flex justify-center items-center bg-gray-200 rounded-2xl w-16 h-16  sm:w-20 sm:h-20 md:w-24 md:h-24">
                    <Icon
                      className="w-[80%] h-[80%] group-hover:scale-[1.05] transition-transform duration-300"
                      Svg={ApartmentIcon}
                    />
                  </div>
                  <span className="font-bold">Купить</span>
                </Link>
              </li>
              <li>
                <Link
                  className="group flex flex-col gap-2 items-center"
                  href="/ads/rent/apartment"
                >
                  <div className="flex justify-center items-center bg-gray-200 rounded-2xl w-16 h-16  sm:w-20 sm:h-20 md:w-24 md:h-24">
                    <Icon
                      className="w-[80%] h-[80%] group-hover:scale-[1.05] transition-transform duration-300"
                      Svg={HouseIcon}
                    />
                  </div>
                  <span className="font-bold">Снять</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <CaterorySectionList data={data} />
      </Container>
    </main>
  );
}
