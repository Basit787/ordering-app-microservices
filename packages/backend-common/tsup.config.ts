import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  // cjs for the CommonJS Nest server, esm for ESM consumers
  format: ["esm", "cjs"],
  platform: "node",
  target: "node20",
  // tsup sets `baseUrl` for the declaration build, which TypeScript 6 flags as deprecated
  dts: { compilerOptions: { ignoreDeprecations: "6.0" } },
  sourcemap: true,
  clean: !options.watch,
}));
