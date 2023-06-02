import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AppUserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.appUser.findMany();
    return users;
  }

  async createUser(userData: any) {
    const newUser = await this.prisma.appUser.create({
      data: {
        name: userData.name,
        password: userData.password,
        email: userData.email,
        idUserType: userData.idUserType
      },
    });
    return newUser;
  }
  
}
