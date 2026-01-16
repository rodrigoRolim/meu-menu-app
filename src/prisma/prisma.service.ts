import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';


@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    })
    super({adapter});
  }
  async onModuleInit() {
    try {
      // await this.$queryRaw`SELECT 1`;
      await this.$connect();
      Logger.log('Prisma connected successfully.');
    } catch (error) {
      Logger.error('Error connecting to Prisma:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}