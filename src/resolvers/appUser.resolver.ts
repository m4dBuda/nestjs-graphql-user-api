import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AppUserEntity } from '../entitities/appUser.entity';
import { AppUserService } from '../services/appUser.service';
import { CreateUserDto } from '../dto/createAppUser.dto';
import { UpdateUserDto } from '../dto/updateAppUser.dto';
import { UpdateUserPasswordDto } from '../dto/updateUserPassword.dto';

@Resolver(() => AppUserEntity)
export class AppUserResolver {
  constructor(private readonly userService: AppUserService) {}

  @Query(() => [AppUserEntity])
  async getAllUsers(): Promise<AppUserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @Query(() => AppUserEntity, { nullable: true })
  async getUserById(@Args('id') id: string): Promise<AppUserEntity> {
    return await this.userService.getUserById(id);
  }

  @Mutation(() => AppUserEntity)
  async createUser(
    @Args('userData') userData: CreateUserDto,
  ): Promise<AppUserEntity> {
    return await this.userService.createUser(userData);
  }

  @Mutation(() => AppUserEntity)
  async updateUserById(
    @Args('id') id: string,
    @Args('userData') userData: UpdateUserDto,
  ): Promise<AppUserEntity> {
    return await this.userService.updateUserById(id, userData);
  }

  @Mutation(() => AppUserEntity)
  async updateUserPassword(
    @Args('id') id: string,
    @Args('userData') userData: UpdateUserPasswordDto,
  ): Promise<AppUserEntity> {
    return await this.userService.updateUserPassword(id, userData);
  }

  @Mutation(() => AppUserEntity)
  async deleteUserById(@Args('id') id: string): Promise<AppUserEntity> {
    return await this.userService.deleteUserById(id);
  }
}
