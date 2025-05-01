import {
  Ad,
  Query,
  QueryGetAllAdsArgs,
} from "@/shared/config/apollo/generated/types";
import { GET_ALL_ADS_PREVIEW } from "@/shared/config/apollo/requests/getAllAdsPreview";
import { getClient } from "@/shared/config/apollo/rsc-client";
import { Hero } from "@/widgets/main/ui/Main";

export type AdsSectionType = {
  title: string;
  data: Query["getAllAds"]["ads"] | [];
  href: string;
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const revalidate = 900;

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
}: {
  searchParams: SearchParams;
}) {
  const { viewport } = (await searchParams) as { viewport: string };

  const rentApartment = await getAllAdsPreview({
    page: 1,
    limit: 8,
    adType: "rent",
    propertyType: "apartment",
  });

  const rentHouse = await getAllAdsPreview({
    page: 1,
    limit: 8,
    adType: "rent",
    propertyType: "house",
  });

  const sellApartment = await getAllAdsPreview({
    page: 1,
    limit: 8,
    adType: "sell",
    propertyType: "apartment",
  });

  const sellHouse = await getAllAdsPreview({
    page: 1,
    limit: 8,
    adType: "sell",
    propertyType: "house",
  });

  const adsPreview = [
    {
      title: "Снять квартиру",
      data: rentApartment?.getAllAds.ads || [],
      href: "/rent/apartment",
    },
    {
      title: "Снять дом",
      data: rentHouse?.getAllAds.ads || [],
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
