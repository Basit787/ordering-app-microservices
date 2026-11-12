import { Inject, Injectable, Logger, NotFoundException, type OnModuleInit, StreamableFile } from "@nestjs/common";
import { createObjectStorage, type ObjectStorage, type ObjectStorageConfig } from "./object-storage.js";

export const OBJECT_STORAGE_OPTIONS = Symbol("OBJECT_STORAGE_OPTIONS");

// The app's S3 bucket as a Nest provider; the bucket is created on startup when S3_ENDPOINT is reachable
@Injectable()
export class ObjectStorageService implements OnModuleInit {
  readonly bucket: ObjectStorage;
  private readonly logger = new Logger(ObjectStorageService.name);

  constructor(@Inject(OBJECT_STORAGE_OPTIONS) private readonly config: ObjectStorageConfig) {
    this.bucket = createObjectStorage(config);
  }

  async onModuleInit() {
    if (!this.config.endpoint) {
      this.logger.warn("S3_ENDPOINT is not set; file uploads and downloads will fail");
      return;
    }
    try {
      await this.bucket.ensureReady();
    } catch (error) {
      const reason = (error as Error).message;
      this.logger.error(`Bucket ${this.config.bucket} at ${this.config.endpoint} is unavailable: ${reason}`);
    }
  }

  // An object as a StreamableFile, inline or as a download with its original name; 404 when missing
  async streamFile(key: string, options: { inline?: boolean; downloadName?: string } = {}): Promise<StreamableFile> {
    const object = await this.bucket.getObject(key);
    if (!object) throw new NotFoundException("File not found");
    const disposition = options.inline
      ? "inline"
      : options.downloadName
        ? `attachment; filename="${options.downloadName}"`
        : undefined;
    return new StreamableFile(object.stream, { type: object.contentType, length: object.contentLength, disposition });
  }
}
