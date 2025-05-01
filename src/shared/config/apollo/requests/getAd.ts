import { gql } from "@apollo/client";

export const GET_AD = gql`
  query GetAdById($id: ID!) {
    getAdById(id: $id) {
      id
      description
      mainPhoto
      photos
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
      createdAt
      updatedAt
      propertyDetails {
        fields
      }
      deal {
        fields
        price
        durationRent
      }
      views
    }
  }
`;
