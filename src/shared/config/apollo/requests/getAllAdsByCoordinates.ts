import { gql } from "@apollo/client";

export const GET_ALL_ADS_BY_COORDINATES = gql`
  query GetAllAds($filters: AdFilterInput) {
    getAllAds(filters: $filters) {
      ads {
        id
        description
        adType
        propertyType
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
    }
  }
`;
