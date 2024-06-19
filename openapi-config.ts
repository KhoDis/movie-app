import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "https://api.kinopoisk.dev/documentation-json",
  apiFile: "./src/api.ts",
  apiImport: "movieSplitApi",
  outputFile: "./src/movieApi.ts",
  exportName: "movieApi",
  hooks: true,
};

export default config;
