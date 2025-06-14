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
        <AuthProvider hasRefresh={hasRefresh}>
          <Suspense fallback={null}>
            <FavoritesProvider>{children}</FavoritesProvider>
          </Suspense>
        </AuthProvider>
      </QueryProvider>
    </ApolloWrapper>
  );
};
