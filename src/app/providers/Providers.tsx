"use client";
import { ReactNode, Suspense } from "react";
import { ApolloWrapper } from "./ApolloWrapper";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloWrapper>
      <QueryProvider>
        <Suspense fallback="">
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
      </QueryProvider>
    </ApolloWrapper>
  );
};
