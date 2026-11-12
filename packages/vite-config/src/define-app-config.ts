import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { type BackendProject, PORTS } from "ports";
import { defineConfig, type ProxyOptions } from "vite";
import type { AppViteConfigOptions } from "./app-vite-config-options.js";

const localUrl = (port: number) => `http://127.0.0.1:${port}`;

// Vite config every web app shares: React, TanStack Router, Tailwind and a /<service>-api proxy per backend
export const defineAppConfig = ({ port, apis = [] }: AppViteConfigOptions) => {
  const proxy: Record<string, ProxyOptions> = {};
  for (const service of new Set<BackendProject>(["auth", ...apis])) {
    const prefix = `/${service}-api`;
    const target = process.env[`${service.toUpperCase()}_PROXY_TARGET`] || localUrl(PORTS[service].backend);
    proxy[prefix] = { target, changeOrigin: true, rewrite: (path) => path.replace(prefix, "") };
  }

  return defineConfig({
    resolve: { tsconfigPaths: true },
    plugins: [
      devtools(),
      tailwindcss(), // Route folders keep their own code in _lib/ (api, components, utils); the router must not read it as routes
      tanstackRouter({ target: "react", autoCodeSplitting: true, routeFileIgnorePattern: "_lib" }),
      viteReact(),
    ],
    build: { target: "es2022" },
    server: {
      host: true,
      port,
      strictPort: true,
      // File events don't reach Docker containers reliably on macOS
      watch: { usePolling: process.env.CHOKIDAR_USEPOLLING === "true" },
      proxy,
    },
    preview: { host: true, port, allowedHosts: true, proxy },
  });
};
