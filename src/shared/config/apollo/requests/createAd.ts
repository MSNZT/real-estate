import { gql, TypedDocumentNode } from "@apollo/client";
import { MutationCreateAdArgs } from "../generated";

export const CREATE_AD: TypedDocumentNode<any, MutationCreateAdArgs> = gql`
  mutation createAd($createAdInput: CreateAdInput!) {
    createAd(createAdInput: $createAdInput) {
      id
    }
  }
`;
