import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserLoginService } from '../services/userLogin.service';
import { UserLoginDto } from '../dto/userLogin.dto';
import { AppUserLoginEntity } from '../entitities/appUserLogin.entity';

@Resolver()
export class UserLoginResolver {
  constructor(private readonly usersService: UserLoginService) {}

  @Mutation(() => AppUserLoginEntity)
  async userLogin(@Args('userData') userData: UserLoginDto): Promise<object> {
    return await this.usersService.userLogin(userData);
  }
}
