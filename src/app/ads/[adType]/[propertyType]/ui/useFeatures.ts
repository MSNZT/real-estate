import {
  Query,
  QueryGetAllAdsArgs,
} from "@/shared/config/apollo/generated/types";
// import { GET_ALL_ADS_PREVIEW } from "@/shared/config/apollo/requests/getAdsByCategories";
import { useLazyQuery } from "@apollo/client";

export const useFeatures = () => {
  const [getAdsByCoordinates] = useLazyQuery<Query, QueryGetAllAdsArgs>(
    // GET_ALL_ADS_PREVIEW,
    {
      fetchPolicy: "network-only",
    }
  );
  return {
    getAdsByCoordinates,
  };
};
