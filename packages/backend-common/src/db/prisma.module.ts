import { type DynamicModule, Inject, Injectable, Module, type OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// Token of the service's own generated Prisma client; repositories take it with @Inject(PRISMA)
export const PRISMA = Symbol("PRISMA");

// What every generated client offers: a DATABASE_URL constructor, connect and disconnect
interface PrismaClientLike {
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
}
type PrismaClientClass = new (options: { datasourceUrl: string }) => PrismaClientLike;

@Injectable()
class PrismaShutdown implements OnModuleDestroy {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClientLike) {}

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}

// One Prisma client per service, built from its generated class (`@prisma-db/<service>`) and DATABASE_URL
@Module({})
export class PrismaModule {
  static forRoot(Client: PrismaClientClass): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA,
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => {
            const client = new Client({ datasourceUrl: config.getOrThrow<string>("DATABASE_URL") });
            await client.$connect();
            return client;
          },
        },
        PrismaShutdown,
      ],
      exports: [PRISMA],
    };
  }
}
