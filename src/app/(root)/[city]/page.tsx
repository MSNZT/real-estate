import {
  Ad,
  Query,
  QueryGetAllAdsArgs,
} from "@/shared/config/apollo/generated/types";
import { GET_ALL_ADS_PREVIEW } from "@/shared/config/apollo/requests/getAllAdsPreview";
import { getClient } from "@/shared/config/apollo/rsc-client";
import { Hero } from "@/widgets/main/ui/Main";
import { fetchCityName } from "./layout";

export type AdsSectionType = {
  title: string;
  data: Query["getAllAds"]["ads"] | [];
  href: string;
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const revalidate = 60;
export const dynamic = "force-dynamic"; // ДОДЕЛАТЬ

async function getAllAdsPreview(
  filters: QueryGetAllAdsArgs["filters"]
): Promise<Query | undefined> {
  const client = getClient();

  try {
    const { data } = await client.query<Query, QueryGetAllAdsArgs>({
      query: GET_ALL_ADS_PREVIEW,
      variables: {
        filters,
      },
    });
    return data;
  } catch (error) {}
}

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: Promise<{ city: string }>;
}) {
  const { viewport } = (await searchParams) as { viewport: string };
  const { city: cityParams } = await params;
  // const response = await fetchCityName(cityParams);

  let city = "Санкт Перебург ";

  // if (response.suggestions.length) {
  //   const { data } = response.suggestions[0];
  //   console.log("bbbb", data);
  //   city = data.city ? data.city : data.settlement_with_type;
  //   // console.log("aligb", data.city);
  // } else {
  //   city = "Москва";
  // }

  // console.log("page", city);

  const rentShortApartment = await getAllAdsPreview({
    page: 1,
    limit: 8,
    adType: "rent_short",
    propertyType: "apartment",
    // location: {
    //   city,
    // },
  });

  const rentShortHouse = await getAllAdsPreview({
    page: 1,
    limit: 8,
    adType: "rent_short",
    propertyType: "house",
    // location: {
    //   city,
    // },
  });

  const sellApartment = await getAllAdsPreview({
    page: 1,
    limit: 8,
    adType: "sell",
    propertyType: "apartment",
    // location: {
    //   city,
    // },
  });

  const sellHouse = await getAllAdsPreview({
    page: 1,
    limit: 8,
    adType: "sell",
    propertyType: "house",
    // location: {
    //   city,
    // },
  });

  // console.log(rentShortApartment);

  const adsPreview = [
    {
      title: "Снять квартиру",
      data: rentShortApartment?.getAllAds.ads || [],
      href: "/rent/apartment",
    },
    {
      title: "Снять дом",
      data: rentShortHouse?.getAllAds.ads || [],
      href: "/rent/house",
    },
    {
      title: "Купить квартиру",
      data: sellApartment?.getAllAds.ads || [],
      href: "/sell/apartment",
    },
    {
      title: "Купить дом",
      data: sellHouse?.getAllAds.ads || [],
      href: "/sell/house",
    },
  ] satisfies AdsSectionType[];

  return <Hero data={adsPreview} />;
}
