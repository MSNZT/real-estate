"use client";
import { ReactNode, Suspense } from "react";
import { ApolloWrapper } from "./ApolloWrapper";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { FavoritesProvider } from "@/features/favorites";
import { AuthRequiredProvider } from "./AuthRequiredProvider";

export const Providers = ({
  children,
  hasRefresh,
}: {
  children: ReactNode;
  hasRefresh: boolean;
}) => {
  return (
    <ApolloWrapper>
      <QueryProvider>
        <AuthProvider hasRefresh={hasRefresh}>
          <AuthRequiredProvider>
            <Suspense fallback={null}>
              <FavoritesProvider>{children}</FavoritesProvider>
            </Suspense>
          </AuthRequiredProvider>
        </AuthProvider>
      </QueryProvider>
    </ApolloWrapper>
  );
};
