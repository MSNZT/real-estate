import { gql } from "@apollo/client";

export const GET_ADS_BY_CATEGORIES = gql`
  query GetAdsByCategories($data: AdsByCategoriesInput!) {
    getAdsByCategories(data: $data) {
      adType
      propertyType
      ads {
        id
        adType
        propertyType
        title
        location {
          city
          address
          latitude
          longitude
        }
        mainPhoto
        owner {
          id
          name
        }
        deal {
          price
          fields
        }
        createdAt
        updatedAt
      }
    }
  }
`;
