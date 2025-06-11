import { TOGGLE_FAVORITE } from "@/shared/config/apollo/requests/toggleFavorite";
import { useMutation } from "@apollo/client";

export const toggleFavorite = () => {
  const [toggleAdFavorite] = useMutation(TOGGLE_FAVORITE);
  return {
    toggleAdFavorite,
  };
};
