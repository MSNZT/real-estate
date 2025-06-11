import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAllAds($filters: AdFilterInput) {
    getAllAds(filters: $filters) {
      ads {
        id
        description
        adType
        propertyType
        title
        mainPhoto
        photos
        location {
          city
          address
          latitude
          longitude
        }
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
      hasNextPage
    }
  }
`;
