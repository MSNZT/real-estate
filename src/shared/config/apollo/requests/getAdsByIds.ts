import { gql } from "@apollo/client";

export const GET_ADS_BY_IDS = gql`
  query GetAdsByIds($ids: [String!]!) {
    getAdsByIds(ids: $ids) {
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
`;
