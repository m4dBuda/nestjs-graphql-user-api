import { AppUserController } from './controllers/appUser.controller';
import { UserLoginController } from './controllers/login.controller';
import { AppUserService } from './services/appUser.service';
import { UserLoginService } from './services/userLogin.service';
import { TokenService } from './services/token.service';
import { PrismaService } from 'prisma/prisma.service';

export const controllers = [AppUserController, UserLoginController];
export const services = [AppUserService, UserLoginService, TokenService, PrismaService];
