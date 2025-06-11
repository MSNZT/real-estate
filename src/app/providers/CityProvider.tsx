"use client";
import { createContext, ReactNode, use } from "react";

type CityContextType = {
  value: string;
};

const CityContext = createContext<CityContextType | undefined>({
  value: "Москва",
});

export const CityProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value?: CityContextType;
}) => {
  return <CityContext value={value}>{children}</CityContext>;
};

export const useCity = () => {
  const city = use(CityContext);
  if (!city) {
    throw new Error("useCity должен использоваться внутри CityProvider");
  }
  return city;
};
