import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAllAds($filters: AdFilterInput) {
    getAllAds(filters: $filters) {
      ads {
        id
        description
        adType
        propertyType
        mainPhoto
        photos
        location {
          city
          street
          latitude
          longitude
        }
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
          durationRent
        }
        createdAt
        updatedAt
      }
      hasNextPage
    }
  }
`;
