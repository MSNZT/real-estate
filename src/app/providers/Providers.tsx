"use client";
import { ReactNode, Suspense } from "react";
import { ApolloWrapper } from "./ApolloWrapper";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { FavoritesProvider } from "@/features/favorites";
import { AuthRequiredProvider } from "./AuthRequiredProvider";
import { LocationProvider } from "./LocationProvider";
import { LocationState } from "@/shared/hooks/use-location";

export const Providers = ({
  children,
  hasRefresh,
  location,
}: {
  children: ReactNode;
  hasRefresh: boolean;
  location: LocationState["location"] | undefined;
}) => {
  return (
    <ApolloWrapper>
      <QueryProvider>
        <AuthProvider hasRefresh={hasRefresh}>
          <AuthRequiredProvider>
            <Suspense fallback={null}>
              <LocationProvider location={location}>
                <FavoritesProvider>{children}</FavoritesProvider>
              </LocationProvider>
            </Suspense>
          </AuthRequiredProvider>
        </AuthProvider>
      </QueryProvider>
    </ApolloWrapper>
  );
};
