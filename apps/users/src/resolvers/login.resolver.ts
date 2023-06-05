import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserLoginService } from '../services/userLogin.service';
import { UserLoginDto } from '../dto/userLogin.dto';

@Resolver()
export class UserLoginResolver {
  constructor(private readonly usersService: UserLoginService) {}

  @Mutation()
  async loginUser(@Args('userData') userData: UserLoginDto) {
    return await this.usersService.userLogin(userData);
  }
}
