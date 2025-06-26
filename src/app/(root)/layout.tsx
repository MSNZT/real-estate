import { CityProvider } from "@/app/providers/CityProvider";
import { Header } from "@/widgets/header";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export async function fetchCityName(city: string) {
  try {
    const response = await fetch(
      "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token 4050077a7049b96f5224fcdfff815e84218026ad",
        },
        body: JSON.stringify({
          query: city,
          from_bound: { value: "city" },
          to_bound: { value: "city" },
          language: "ru",
        }),
        cache: "force-cache",
      }
    );

    const data = await response.json();

    return data;
  } catch {}
}

export default async function MainLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ city: string }>;
}) {
  // const { city: cityParams } = await params;
  // const response = await fetchCityName(cityParams);

  // if (!response.suggestions.length) {
  //   // redirect("/moscow");
  // }

  // const { data } = response.suggestions[0];
  // const city = data.city ? data.city : data.settlement_with_type;

  return (
    <>
      <Header />
      {children}
    </>
  );
}
