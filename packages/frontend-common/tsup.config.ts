import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "es2022",
  // tsup sets `baseUrl` for the declaration build, which TypeScript 6 flags as deprecated
  dts: { compilerOptions: { ignoreDeprecations: "6.0" } },
  // Dev containers set TSUP_DTS=false: Vite never reads .d.ts, and the declaration build is memory-heavy
  ...(process.env.TSUP_DTS === "false" && { dts: false }),
  sourcemap: true,
  clean: !options.watch,
  treeshake: true,
}));
