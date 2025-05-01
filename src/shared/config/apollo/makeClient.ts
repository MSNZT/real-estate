import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { Ad } from "./generated/types";

export function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:5001/api/ads",
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    // defaultOptions: {
    //   watchQuery: {
    //     fetchPolicy: "network-only",
    //   },
    // },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getAllAds: {
              keyArgs: ["filters", ["adType", "propertyType", "location"]],
              merge(existing: Ad[] = [], incoming: Ad[], { args }) {
                // Если это первая страница - заменяем данные полностью
                if (args?.filters.page === 1) return incoming;
                // Для последующих страниц - объединяем
                return [...(existing || []), ...incoming];
              },
            },
          },
        },
        Ad: {
          keyFields: ["id"],
        },
      },
    }),
    link: httpLink,
  });
}
