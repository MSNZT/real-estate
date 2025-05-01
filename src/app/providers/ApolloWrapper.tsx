"use client";
import { PropsWithChildren } from "react";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";
import { makeClient } from "@/shared/config/apollo/makeClient";

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
