import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { compareSync } from 'bcrypt';
import { ResponseHelper } from '../helpers/response.helpers';
import { TokenService } from './token.service';

@Injectable()
export class UserLoginService {
  constructor(private readonly prisma: PrismaService, private readonly tokenService: TokenService) {}

  async userLogin(userData: any) {
    try {
      const existingUser = await this.prisma.appUser.findFirst({
        include: { userType: { select: { type: true } } },
        where: { email: userData.email },
      });
      
      if (!existingUser) {
        return ResponseHelper.error('Usuário não encontrado');
      }
      
      const isPasswordCorrect = compareSync(userData.password, existingUser.password);
      
      if (!isPasswordCorrect) {
        return ResponseHelper.error('Senha incorreta');
      }
      
      const token = this.tokenService.generateToken({ email: existingUser.email });
      const { password, userType, ...userWithoutPassword } = existingUser;
  
      return ResponseHelper.success({ ...userWithoutPassword, type: userType?.type, token: `Bearer ${token}` });
    } catch (error) {
      return ResponseHelper.error(error.message);
    }
  }
  
}
