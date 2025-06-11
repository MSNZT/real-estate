import { gql } from "@apollo/client";

export const SYNC_FAVORITES = gql`
  mutation SyncFavorites($ids: [String!]!) {
    syncFavorites(ids: $ids) {
      status
    }
  }
`;
