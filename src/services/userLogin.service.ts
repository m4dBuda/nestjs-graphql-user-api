import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { compareSync } from 'bcrypt';
import { TokenService } from './token.service';
import { AppUserLoginEntity } from '../entitities/appUserLogin.entity';
import {
  UserNotFoundException,
  PasswordIncorrectException,
} from '../exceptions/exception.helpers';

@Injectable()
export class UserLoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async userLogin(userData: any): Promise<AppUserLoginEntity> {
    const existingUser = await this.prisma.appUser.findFirst({
      include: { userType: { select: { id: true, type: true } } },
      where: { email: userData.email },
    });

    if (!existingUser) {
      throw new UserNotFoundException();
    }

    const isPasswordCorrect = compareSync(
      userData.password,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      throw new PasswordIncorrectException();
    }

    const token = this.tokenService.generateToken({
      email: existingUser.email,
    });
    const userLogin: AppUserLoginEntity = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      idUserType: existingUser.userType.id,
      type: existingUser.userType.type,
      token: `Bearer ${token}`,
    };
    return userLogin;
  }
}
