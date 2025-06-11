"use client";
import { ReactNode, Suspense } from "react";
import { ApolloWrapper } from "./ApolloWrapper";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { FavoritesProvider } from "@/features/favorites";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloWrapper>
      <QueryProvider>
        <FavoritesProvider>
          <Suspense fallback="">
            <AuthProvider>{children}</AuthProvider>
          </Suspense>
        </FavoritesProvider>
      </QueryProvider>
    </ApolloWrapper>
  );
};
