import { GET_FAVORITES } from "@/shared/config/apollo/requests/getFavorites";
import { useLazyQuery } from "@apollo/client";

export const getFavorites = () => {
  const [fetchFavorites, {}] = useLazyQuery(GET_FAVORITES);

  return {
    fetchFavorites,
  };
};
