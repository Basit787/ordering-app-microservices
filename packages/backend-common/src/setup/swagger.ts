import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// Swagger UI at /docs (spec at /docs/openapi.json), generated from the controllers and DTOs
export const setupSwagger = (app: INestApplication, { title, description }: { title: string; description: string }) => {
  const auth =
    "**Authentication:** get a token from the auth service (`POST /auth/login`) and paste it into Authorize.";
  const config = new DocumentBuilder()
    .setTitle(title)
    .setVersion("1.0.0")
    .setDescription(`${description}\n\n${auth}`)
    .addBearerAuth()
    .build();
  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, config), {
    jsonDocumentUrl: "docs/openapi.json",
    customSiteTitle: title,
    swaggerOptions: { persistAuthorization: true },
  });
};
