import { SetMetadata } from "@nestjs/common";
import { IS_PUBLIC } from "./metadata-keys.js";

// Lets a route (or every route of a controller) through without a token
export const Public = () => SetMetadata(IS_PUBLIC, true);
