import { gql } from "@apollo/client";

export const GET_AD = gql`
  query GetAdById($id: ID!) {
    getAdById(id: $id) {
      id
      description
      mainPhoto
      photos
      title
      adType
      features
      propertyType
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
      createdAt
      updatedAt
      propertyDetails {
        fields
      }
      contact {
        name
        email
        phone
        communication
      }
      deal {
        fields
        price
      }
      views
    }
  }
`;
