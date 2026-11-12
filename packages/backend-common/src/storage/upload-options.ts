import path from "node:path";
import multer from "multer";
import { HttpError } from "../errors/http-error.js";

// What FileInterceptor's in-memory storage hands to @UploadedFile()
export type UploadedFileData = {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};

export type UploadOptions = {
  maxFileSizeMb: number;
  // Reject anything that isn't an image/* upload
  imagesOnly?: boolean;
};

type UploadedFileInfo = { originalname: string; mimetype: string };
type AcceptFile = (error: Error | null, acceptFile: boolean) => void;

// Multer options for Nest's MulterModule / FileInterceptor: uploads stay in memory for `objectStorage.put`
export const createUploadOptions = ({ maxFileSizeMb, imagesOnly = false }: UploadOptions) => ({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxFileSizeMb * 1024 * 1024 },
  fileFilter: (_req: unknown, file: UploadedFileInfo, accept: AcceptFile) => {
    if (imagesOnly && !file.mimetype.startsWith("image/")) {
      accept(new HttpError(400, "Only image files are allowed"), false);
      return;
    }
    // Never trust client-sent paths in file names
    file.originalname = path.basename(file.originalname);
    accept(null, true);
  },
});
