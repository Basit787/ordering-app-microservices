import { randomUUID } from "node:crypto";
import path from "node:path";

// `folder/<uuid>.<ext>`: a new key per upload, e.g. chat attachments
export const uniqueObjectKey = (folder: string, originalName: string) =>
  `${folder}/${randomUUID()}${path.extname(originalName)}`;

// `folder/<id>.<ext>`: one object per entity, e.g. a user's avatar
export const entityObjectKey = (folder: string, id: string, originalName: string, defaultExt = ".jpg") =>
  `${folder}/${id}${path.extname(originalName).toLowerCase() || defaultExt}`;
