import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      
      "https://worthy-bear-42.hasura.app/v1/graphql": {
        
        headers: {
          'x-hasura-admin-secret':
          "HINCMOtg8j9unPjz7iB90GNltB67pE9EgNZ6S5DXnNGuL4B90wHZV12lVmRC2406",
          'Access-Control-Allow-Origin': '*',
        },
      },
    },
  ],
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-apollo-angular",
      ],
      config: {
        addExplicitOverride: true,
      },
    },
  },
};
export default config;