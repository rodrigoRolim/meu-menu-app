import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterInput } from "./dto/register.input";
import bcrypt from 'bcrypt'
import { User } from "generated/prisma/client";
import { LoginInput } from "./dto/login.input";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async register(data: RegisterInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword
      }
    })

    return this.generateToken(user)
  }

  async login(data: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email }
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password
    )

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return this.generateToken(user)
  }

  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email
    }

    return {
      accessToken: this.jwt.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    }
  }
}
