import {
  AdTypes,
  PropertyTypes,
  Query,
} from "@/shared/config/apollo/generated";
import { GET_ALL_ADS } from "@/shared/config/apollo/requests/getAllAds";
import { useSuspenseQuery } from "@apollo/client";
import { useCallback, useEffect, useRef, useTransition } from "react";

export const useAds = (
  adType: AdTypes,
  propertyType: PropertyTypes,
  inView: boolean
) => {
  const pageRef = useRef(1);
  const [isPending, startTransition] = useTransition();
  const { data, error, fetchMore } = useSuspenseQuery<Query>(GET_ALL_ADS, {
    variables: {
      filters: {
        adType,
        propertyType,
        page: 1,
        limit: 8,
      },
    },
    fetchPolicy: "cache-first",
  });

  const loadMore = useCallback(async () => {
    startTransition(async () => {
      await fetchMore({
        variables: {
          filters: {
            adType,
            propertyType,
            page: pageRef.current + 1,
            limit: 8,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          pageRef.current += 1;
          return {
            getAllAds: {
              ...prev.getAllAds,
              ads: [...prev.getAllAds.ads, ...fetchMoreResult.getAllAds.ads],
              hasNextPage: fetchMoreResult.getAllAds.hasNextPage,
            },
          };
        },
      });
    });
  }, [pageRef.current, adType, propertyType]);

  useEffect(() => {
    if (inView && data?.getAllAds?.hasNextPage) {
      loadMore();
    }
  }, [inView]);
  return {
    data: data.getAllAds.ads,
    error,
    isLoading: isPending,
  };
};
