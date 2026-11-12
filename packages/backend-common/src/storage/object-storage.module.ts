import { type DynamicModule, type InjectionToken, Module } from "@nestjs/common";
import type { ObjectStorageConfig } from "./object-storage.js";
import { OBJECT_STORAGE_OPTIONS, ObjectStorageService } from "./object-storage.service.js";

type ObjectStorageModuleOptions = {
  inject?: InjectionToken[];
  useFactory: (...args: never[]) => ObjectStorageConfig;
};

// Global ObjectStorageService, configured from the app's own config, e.g. inject: [appConfig.KEY]
@Module({})
export class ObjectStorageModule {
  static forRoot({ inject = [], useFactory }: ObjectStorageModuleOptions): DynamicModule {
    return {
      module: ObjectStorageModule,
      global: true,
      providers: [{ provide: OBJECT_STORAGE_OPTIONS, inject, useFactory }, ObjectStorageService],
      exports: [ObjectStorageService],
    };
  }
}
