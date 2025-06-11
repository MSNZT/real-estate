import { gql } from "@apollo/client";

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavoriteAd($id: ID!) {
    toggleFavoriteAd(id: $id) {
      id
      status
    }
  }
`;
