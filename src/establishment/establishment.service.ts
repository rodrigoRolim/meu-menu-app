import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateEstablishmentInput } from "./dto/create-establishment.input";

@Injectable()
export class EstablishmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEstablishmentInput, ownerId: string) {
    return this.prisma.establishment.create({
       data: {
        name: data.name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        neighborhood: data.neighborhood,
        zipCode: data.zipCode,
        complement: data.complement,
        slug: data.slug,
        estimatedPreparationTime: data.estimatedPreparationTime,
        minOrderAmount: data.minOrderAmount,
        deliveryFee: data.deliveryFee,
        acceptedTerms: data.acceptedTerms,
        isVisible: data.isVisible,
        isOpen: data.isOpen,
        logoUrl: data.logoUrl,
        coverImageUrl: data.coverImageUrl,
        owner: {
          connect: { id: ownerId }
        },

        businessHours: {
          create: data.businessHours?.length
            ? data.businessHours
            : [
                { dayOfWeek: 1, openTime: "08:00", closeTime: "12:00" }
              ]
        } 
     }})
  }

  async saveCoverImage(establishmentId: string, fileUrl: string) {
    return this.prisma.establishment.update({
      where: { id: establishmentId },
      data: {
        coverImageUrl: fileUrl
      }
    })
  }
}
