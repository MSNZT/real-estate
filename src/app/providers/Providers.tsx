"use client";
import { ReactNode, Suspense } from "react";
import { ApolloWrapper } from "./ApolloWrapper";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { FavoritesProvider } from "@/features/favorites";

export const Providers = ({
  children,
  hasRefresh,
}: {
  children: ReactNode;
  hasRefresh: boolean;
}) => {
  console.log(hasRefresh);

  return (
    <ApolloWrapper>
      <QueryProvider>
        <Suspense fallback="">
          <AuthProvider hasRefresh={hasRefresh}>
            <FavoritesProvider>{children}</FavoritesProvider>
          </AuthProvider>
        </Suspense>
      </QueryProvider>
    </ApolloWrapper>
  );
};
