import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppUserService } from '../services/appUser.service';
import { CreateUserDto } from '../dto/createAppUser.dto';
import { UpdateUserDto } from '../dto/UpdateAppUser.dto';
import { UpdateUserPasswordDto } from '../dto/updateUserPassword.dto';

@Resolver()
export class AppUserResolver {
  constructor(private readonly usersService: AppUserService) {}

  @Query()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Query()
  getUserById(@Args('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Mutation()
  createUser(@Args('userData') userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

  @Mutation()
  updateUserById(@Args('id') id: string, @Args('userData') userData: UpdateUserDto) {
    return this.usersService.updateUserById(id, userData);
  }

  @Mutation()
  updateUserPassword(@Args('id') id: string, @Args('userData') userData: UpdateUserPasswordDto) {
    return this.usersService.updateUserPassword(id, userData);
  }

  @Mutation()
  deleteUserById(@Args('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
