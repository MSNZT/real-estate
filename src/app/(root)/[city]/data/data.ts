import { Query, QueryGetAllAdsArgs } from "@/shared/config/apollo/generated";
import { GET_ALL_ADS_PREVIEW } from "@/shared/config/apollo/requests/getAllAdsPreview";
import { getClient } from "@/shared/config/apollo/rsc-client";

export type AdsSectionType = {
  title: string;
  data: Query["getAllAds"]["ads"] | [];
  href: string;
};

export async function getAllAdsPreview(
  filters: QueryGetAllAdsArgs["filters"]
): Promise<Query> {
  const client = getClient();

  const { data } = await client.query<Query, QueryGetAllAdsArgs>({
    query: GET_ALL_ADS_PREVIEW,
    variables: {
      filters,
    },
  });

  if (!data) {
    throw new Error("Ошибка при получении объявлений");
  }
  return data;
}

export async function getAdsPreviewData(): Promise<AdsSectionType[]> {
  const [rentShortApartment, rentShortHouse, sellApartment, sellHouse] =
    await Promise.allSettled([
      getAllAdsPreview({
        page: 1,
        limit: 8,
        adType: "rent_short",
        propertyType: "apartment",
        // location: {
        //   city,
        // },
      }),
      getAllAdsPreview({
        page: 1,
        limit: 8,
        adType: "rent_short",
        propertyType: "house",
        // location: {
        //   city,
        // },
      }),
      getAllAdsPreview({
        page: 1,
        limit: 8,
        adType: "sell",
        propertyType: "apartment",
        // location: {
        //   city,
        // },
      }),
      getAllAdsPreview({
        page: 1,
        limit: 8,
        adType: "sell",
        propertyType: "house",
        // location: {
        //   city,
        // },
      }),
    ]);

  const getAdsData = (result: PromiseSettledResult<Query>) => {
    if (result.status !== "fulfilled" || !result.value.getAllAds) return [];
    return result.value.getAllAds.ads || [];
  };

  return [
    {
      title: "Снять квартиру",
      data: getAdsData(rentShortApartment),
      href: "/rent/apartment",
    },
    {
      title: "Снять дом",
      data: getAdsData(rentShortHouse),
      href: "/rent/house",
    },
    {
      title: "Купить квартиру",
      data: getAdsData(sellApartment),
      href: "/sell/apartment",
    },
    {
      title: "Купить дом",
      data: getAdsData(sellHouse),
      href: "/sell/house",
    },
  ];
}
