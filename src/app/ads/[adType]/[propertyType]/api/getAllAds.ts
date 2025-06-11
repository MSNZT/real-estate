import {
  Query,
  QueryGetAllAdsArgs,
} from "@/shared/config/apollo/generated/types";
import { GET_ALL_ADS } from "@/shared/config/apollo/requests/getAllAds";
import { getClient } from "@/shared/config/apollo/rsc-client";

export async function getAllAds(
  filters: QueryGetAllAdsArgs["filters"]
): Promise<Query | undefined> {
  const client = getClient();

  try {
    const { data } = await client.query<Query, QueryGetAllAdsArgs>({
      query: GET_ALL_ADS,
      variables: {
        filters,
      },
    });
    return data;
  } catch (error) {}
}
