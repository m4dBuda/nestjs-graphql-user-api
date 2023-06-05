import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { compareSync, hashSync } from 'bcrypt';
import { ResponseHelper } from '../helpers/response.helpers';
import { CreateUserDto } from '../dto/appUser/createAppUser.dto';
import { UpdateUserDto } from '../dto/appUser/UpdateAppUser.dto';
import { UpdateUserPasswordDto } from 'src/dto/appUser/updateUserPassword.dto';

@Injectable()
export class AppUserService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.appUser.findMany({
        include: { userType: { select: { type: true } } },
        orderBy: {
          id: 'asc',
        },
      });
  
      const formattedUsers = users.map((user) => ({
        ...user,
        type: user.userType?.type,
        userType: undefined,
      }));
  
      return ResponseHelper.success(formattedUsers);
    } catch (error) {
      return ResponseHelper.error(error.message);
    }
  }
  

  async getUserById(id: string) {
    try {
      const userId = parseInt(id, 10);
      const user = await this.prisma.appUser.findFirst({
        where: { id: userId },
        include: { userType: true },
      });
  
      if (!user) {
        return ResponseHelper.notFoundError();
      }
  
      const { userType, ...userData } = user;
      const formattedUser = {
        ...userData,
        type: userType?.type,
      };
  
      return ResponseHelper.success(formattedUser);
    } catch (error) {
      return ResponseHelper.error(error.message);
    }
  }
  
  

  async createUser(userData: CreateUserDto) {
    try {
      const existingUser = await this.prisma.appUser.findFirst({
        where: { email: userData.email },
      });
      
      if (existingUser) {
        return ResponseHelper.error('Email já cadastrado');
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

      return ResponseHelper.created(newUser);
    } catch (error) {
      return ResponseHelper.error(error.message);
    }
  }

  async updateUserById(id: string, userData: UpdateUserDto) {
    try {
      const userId = parseInt(id, 10);

      const user = await this.prisma.appUser.findFirst({
        where: { id: userId },
      });
      
      if (!user) {
        return ResponseHelper.notFoundError();
      }
      
      const updatedUser = await this.prisma.appUser.update({
        where: { id: userId },
        data: {
          name: userData.name,
          email: userData.email,
          idUserType: userData.idUserType,
        },
      });

      return ResponseHelper.success(updatedUser);
    } catch (error) {
      return ResponseHelper.error(error.message);
    }
  }
  async updateUserPassword(id: string, userData: UpdateUserPasswordDto) {
    try {
      const userId = parseInt(id, 10);

      const existingUser = await this.prisma.appUser.findFirst({
        where: { id: userId },
      });
      
      if (!existingUser) {
        return ResponseHelper.notFoundError();
      }

      const isPasswordCorrect = compareSync(userData.password, existingUser.password);
      if (!isPasswordCorrect) {
        return ResponseHelper.error('Senha incorreta');
      }
      const hashedPassword = hashSync(userData.newPassword, 10);

      const updatedUser = await this.prisma.appUser.update({
        where: { id: userId },
        data: { password: hashedPassword},
      });

      return ResponseHelper.success(updatedUser);
    } catch (error) {
      return ResponseHelper.error(error.message);
    }
  }

  async deleteUserById(id: string) {
    try {
      const userId = parseInt(id, 10);

      const user = await this.prisma.appUser.findFirst({
        where: { id: userId },
      });
      
      if (!user) {
        return ResponseHelper.notFoundError();
      }

      const deletedUser = await this.prisma.appUser.delete({
        where: { id: userId },
      });

      return ResponseHelper.success(deletedUser);
    } catch (error) {
      return ResponseHelper.error(error.message);
    }
  }
}
