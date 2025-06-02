import { gql, TypedDocumentNode } from "@apollo/client";
import { Query } from "../generated";

export const GET_FAVORITES: TypedDocumentNode<Query, any> = gql`
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
