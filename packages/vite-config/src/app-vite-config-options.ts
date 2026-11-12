import type { BackendProject } from "ports";

export type AppViteConfigOptions = {
  // Dev server port, from PORTS
  port: number;
  // Services proxied at /<service>-api (prefix stripped); <SERVICE>_PROXY_TARGET overrides a URL. auth is always proxied
  apis?: BackendProject[];
};
