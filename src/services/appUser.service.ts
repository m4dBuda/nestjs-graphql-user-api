import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { compareSync, hashSync } from 'bcrypt';
import { CreateUserDto } from '../dto/createAppUser.dto';
import { UpdateUserDto } from '../dto/updateAppUser.dto';
import { UpdateUserPasswordDto } from '../dto/updateUserPassword.dto';
import {
  UserNotFoundException,
  UserAlreadyExistsException,
  InvalidPasswordException,
} from '../exceptions/exception.helpers';

@Injectable()
export class AppUserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<any> {
    const users = await this.prisma.appUser.findMany({
      include: { userType: { select: { type: true } } },
      orderBy: {
        id: 'asc',
      },
    });

    const formattedUsers = users.map((user) => ({
      ...user,
      type: user.userType ? user.userType.type : null,
      userType: undefined,
    }));

    return formattedUsers;
  }

  async getUserById(id: string): Promise<any> {
    const userId = parseInt(id, 10);
    const user = await this.prisma.appUser.findFirst({
      where: { id: userId },
      include: { userType: true },
    });

    if (user) {
      return user;
    } else {
      throw new UserNotFoundException();
    }
  }

  async createUser(userData: CreateUserDto): Promise<any> {
    const existingUser = await this.prisma.appUser.findFirst({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    const hashedPassword = hashSync(userData.password, 10);

    const newUser = await this.prisma.appUser.create({
      data: {
        name: userData.name,
        password: hashedPassword,
        email: userData.email,
        idUserType: userData.idUserType,
      },
    });

    return newUser;
  }

  async updateUserById(id: string, userData: UpdateUserDto): Promise<any> {
    const userId = parseInt(id, 10);

    const user = await this.prisma.appUser.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    const updatedUser = await this.prisma.appUser.update({
      where: { id: userId },
      data: {
        name: userData.name,
        email: userData.email,
        idUserType: userData.idUserType,
      },
    });

    return updatedUser;
  }

  async updateUserPassword(
    id: string,
    userData: UpdateUserPasswordDto,
  ): Promise<any> {
    const userId = parseInt(id, 10);

    const existingUser = await this.prisma.appUser.findFirst({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new UserNotFoundException();
    }

    const isPasswordCorrect = compareSync(
      userData.password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      throw new InvalidPasswordException();
    }
    const hashedPassword = hashSync(userData.newPassword, 10);

    const updatedUser = await this.prisma.appUser.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return updatedUser;
  }

  async deleteUserById(id: string): Promise<any> {
    const userId = parseInt(id, 10);

    const user = await this.prisma.appUser.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    const deletedUser = await this.prisma.appUser.delete({
      where: { id: userId },
    });

    return deletedUser;
  }
}
