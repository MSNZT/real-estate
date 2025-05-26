import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { Ad } from "./generated/types";
import { setContext } from "@apollo/client/link/context";
import { tokenService } from "@/shared/services/token.service";

export function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:5001/api/ads",
    fetchOptions: { cache: "no-store" },
  });

  const authLink = setContext((operation, prevContext) => {
    const { headers } = prevContext;
    const token = tokenService.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
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
    link: ApolloLink.from([authLink, httpLink]),
  });
}
