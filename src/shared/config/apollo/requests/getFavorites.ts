import { gql, TypedDocumentNode } from "@apollo/client";
import { FavoriteAd } from "../generated";

type GetFavoritesResponse = {
  getFavoriteAds: FavoriteAd[];
};

export const GET_FAVORITES: TypedDocumentNode<GetFavoritesResponse, any> = gql`
  query GetFavorites {
    getFavoriteAds {
      ad {
        id
        adType
        propertyType
        title
        mainPhoto
        deal {
          fields
          price
        }
        location {
          latitude
          longitude
          address
          city
        }
      }
    }
  }
`;
