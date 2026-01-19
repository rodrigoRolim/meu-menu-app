import { Body, Controller, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { EstablishmentService } from "./establishment.service";
import { CreateEstablishmentInput } from "./dto/create-establishment.input";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadConfig } from "src/common/config/upload.config";

@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() establishmentData: CreateEstablishmentInput, @Req() req) {
    return this.establishmentService.create(establishmentData, req.user.id)
  }

  @Patch('upload/cover')
  @UseInterceptors(FileInterceptor("file", uploadConfig))
  async uploadCover(
    @Param("id") establishmentId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = `/uploads/${file.filename}`
    return this.establishmentService.saveCoverImage
  }
}