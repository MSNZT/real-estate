import { gql } from "@apollo/client";

export const GET_ALL_ADS_PREVIEW = gql`
  query GetAllAds($filters: AdFilterInput) {
    getAllAds(filters: $filters) {
      ads {
        id
        description
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
        propertyDetails {
          fields
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
