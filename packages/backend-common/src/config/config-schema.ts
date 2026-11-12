import joi from "joi";
import { type BackendProject, PORTS } from "ports";

// Env every service reads; defaults let `pnpm start:dev <service>` run against the compose infrastructure
export const configSchema = (service: BackendProject, keys: joi.PartialSchemaMap = {}) =>
  joi.object({
    NODE_ENV: joi.string().default("development"),
    PORT: joi.number().default(PORTS[service].backend),
    JWT_SECRET: joi.string().default("dev-secret-change-me"),
    CORS_ORIGIN: joi.string().optional(),
    ...keys,
  });

// Each service owns one MongoDB database; Prisma needs the replica set
export const databaseUrl = (database: string) =>
  joi.string().default(`mongodb://localhost:27017/${database}?replicaSet=rs0&directConnection=true`);

export const rabbitMqUri = () => joi.string().default("amqp://localhost:5672");

export const queueName = (name: string) => joi.string().default(name);
