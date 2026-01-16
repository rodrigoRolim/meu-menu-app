import { Module } from "@nestjs/common";
import { EstablishmentService } from "./establishment.service";
import { EstablishmentController } from "./establishment.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  exports: [EstablishmentService],
  providers: [EstablishmentService],
  controllers: [EstablishmentController]
})
export class EstablishmentModule {}