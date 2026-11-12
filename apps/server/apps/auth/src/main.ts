import { bootstrapService } from "backend-common";
import { AppModule } from "./app.module";

void bootstrapService(AppModule, {
  title: "Auth API",
  description: "Register and sign in for a JWT that every service verifies. Admins list users and change roles.",
});
