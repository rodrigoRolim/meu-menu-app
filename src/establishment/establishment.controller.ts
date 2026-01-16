import { Body, Controller, Post } from "@nestjs/common";
import { EstablishmentService } from "./establishment.service";
import { CreateEstablishmentInput } from "./dto/create-establishment.input";

@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Post('create')
  create(@Body() establishmentData: CreateEstablishmentInput) {
    return this.establishmentService.create(establishmentData)
  }
}