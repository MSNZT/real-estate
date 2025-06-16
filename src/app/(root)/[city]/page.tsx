import { Query } from "@/shared/config/apollo/generated/types";
import { Hero } from "@/widgets/main/ui/Main";
import { getAdsPreviewData } from "./data/data";

export type AdsSectionType = {
  title: string;
  data: Query["getAllAds"]["ads"] | [];
  href: string;
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const revalidate = 600;

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: Promise<{ city: string }>;
}) {
  const { viewport } = (await searchParams) as { viewport: string };
  const { city: cityParams } = await params;
  const response = await getAdsPreviewData();
  // const response = await fetchCityName(cityParams);

  let city = "Санкт Перебург";

  // if (response.suggestions.length) {
  //   const { data } = response.suggestions[0];
  //   console.log("bbbb", data);
  //   city = data.city ? data.city : data.settlement_with_type;
  //   // console.log("aligb", data.city);
  // } else {
  //   city = "Москва";
  // }

  return <Hero data={response} />;
}
