import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { Ad } from "./generated/types";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getAllAds: {
              keyArgs: ["filters", ["adType", "propertyType"]],
              merge(existing: Ad[] = [], incoming: Ad[], { args }) {
                // Если это первая страница - заменяем данные полностью
                if (args?.filters.page === 1) return incoming;
                // Для последующих страниц - объединяем
                return [...(existing || []), ...incoming];
              },
            },
          },
        },
      },
    }),
    link: new HttpLink({
      uri: `${proccess.env.NEXT_PUBLIC_API_URL}/graphql`,
      fetchOptions: { cache: "no-store" },
    }),
  });
});
