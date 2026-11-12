import helmet from "helmet";

// helmet: cross-origin files (images, avatars) and Swagger UI's inline scripts, styles and badge
export const securityHeaders = () =>
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    // HSTS only in production: over dev HTTPS it would force https on every localhost port
    strictTransportSecurity: process.env.NODE_ENV === "production",
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "blob:", "https://validator.swagger.io"],
      },
    },
  });
