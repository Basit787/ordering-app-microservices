// Ports per project: frontend (Vite dev server) and backend (Nest service); compose and env files repeat them
export const PORTS = {
  auth: { frontend: 3000, backend: 3001 },
  products: { frontend: 3002, backend: 3021 },
  orders: { frontend: 3003, backend: 3022 },
  payments: { backend: 3023 },
  admin: { frontend: 3004 },
} as const;

export type Project = keyof typeof PORTS;

// Projects that run a Nest service
export type BackendProject = { [P in Project]: "backend" extends keyof (typeof PORTS)[P] ? P : never }[Project];

// Projects that run a web app
export type FrontendProject = { [P in Project]: "frontend" extends keyof (typeof PORTS)[P] ? P : never }[Project];
