import {
  AdTypes,
  PropertyTypes,
  Query,
  QueryGetAdsByCategoriesArgs,
} from "@/shared/config/apollo/generated";
import { GET_ADS_BY_CATEGORIES } from "@/shared/config/apollo/requests/getAdsByCategories";
import { getClient } from "@/shared/config/apollo/rsc-client";

export type AdsSectionType = {
  title: string;
  data: Query["getAllAds"]["ads"];
  pageLink: string;
};

type CategoryKey = `${AdTypes}_${PropertyTypes}`;

const AD_TYPE_TITLE: Record<AdTypes, string> = {
  [AdTypes.RentLong]: "Арендовать",
  [AdTypes.RentShort]: "Арендовать",
  [AdTypes.Sell]: "Купить",
} as const;

const PROPERTY_TYPE_TITLE: Record<PropertyTypes, string> = {
  [PropertyTypes.Apartment]: "квартиру",
  [PropertyTypes.House]: "дом",
} as const;

const ADS_CATEGORY_LINK: Record<CategoryKey, string> = {
  rent_long_apartment: "/rent/apartment",
  rent_long_house: "/rent/house",
  rent_short_apartment: "/rent/apartment",
  rent_short_house: "/rent/house",
  sell_house: "/sell/house",
  sell_apartment: "/sell/apartment",
} as const;

export async function getAdsByCategories(city: string): Promise<Query> {
  const client = getClient();

  try {
    const { data } = await client.query<Query, QueryGetAdsByCategoriesArgs>({
      query: GET_ADS_BY_CATEGORIES,
      variables: {
        data: {
          categories: [
            {
              adType: "rent_short",
              propertyType: "apartment",
              city,
            },
            {
              adType: "rent_long",
              propertyType: "apartment",
              city,
            },
            {
              adType: "rent_short",
              propertyType: "house",
              city,
            },
            {
              adType: "rent_long",
              propertyType: "house",
              city,
            },
            {
              adType: "sell",
              propertyType: "apartment",
              city,
            },
            {
              adType: "sell",
              propertyType: "house",
              city,
            },
          ],
          limit: 6,
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAdsPreviewData(
  city: string
): Promise<AdsSectionType[]> {
  console.log("cccc", city);
  const data = await getAdsByCategories(city);

  const categoryAds = data.getAdsByCategories
    .filter((category) => category.ads.length > 0)
    .map((category) => {
      const categoryKey: CategoryKey = `${category.adType}_${category.propertyType}`;
      return {
        title: `${AD_TYPE_TITLE[category.adType]} ${PROPERTY_TYPE_TITLE[category.propertyType]}`,
        pageLink: ADS_CATEGORY_LINK[categoryKey],
        data: category.ads,
      };
    });

  return categoryAds;
}
