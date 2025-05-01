"use client";
import { ReactNode } from "react";
import { ApolloWrapper } from "./ApolloWrapper";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloWrapper>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </ApolloWrapper>
  );
};
