import { AppUserResolver } from './resolvers/appUser.resolver';
import { UserLoginResolver } from './resolvers/login.resolver';
import { AppUserService } from './services/appUser.service';
import { UserLoginService } from './services/userLogin.service';
import { TokenService } from './services/token.service';
import { PrismaService } from '../prisma/prisma.service';

export const resolvers = [AppUserResolver, UserLoginResolver];
export const services = [
  AppUserService,
  UserLoginService,
  TokenService,
  PrismaService,
];
