import { type BackendProject, type FrontendProject, PORTS } from "ports";

const hostUrl = (port: number) => `http://${window.location.hostname || "localhost"}:${String(port)}`;

// URL of another web app on the host this page was opened from (localhost or a LAN IP)
export const frontendUrl = (project: FrontendProject, path = ""): string =>
  `${hostUrl(PORTS[project].frontend)}${path}`;

// URL of a Nest service on the same host, for links that bypass the dev proxy (e.g. Swagger at /docs)
export const backendUrl = (project: BackendProject): string => hostUrl(PORTS[project].backend);

// The auth app's sign-in, coming back to this page afterwards
export const signInUrl = () => frontendUrl("auth", `/sign-in?next=${encodeURIComponent(window.location.href)}`);
