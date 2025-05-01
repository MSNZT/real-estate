import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:5001/api/ads",
  documents: ["src/**/*.{ts,tsx}", "!src/**/generated/**"],
  generates: {
    "./src/shared/config/apollo/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/shared/config/apollo/generated/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
