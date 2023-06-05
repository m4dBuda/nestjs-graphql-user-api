import { Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe } from '@nestjs/common';
import { AppUserService } from '../services/appUser.service';
import { CreateUserDto } from '../dto/appUser/createAppUser.dto';
import { UpdateUserDto } from '../dto/appUser/UpdateAppUser.dto';
import { UpdateUserPasswordDto } from 'src/dto/appUser/updateUserPassword.dto';

@Controller('app')
export class AppUserController {
  constructor(private readonly usersService: AppUserService) {}

  @Get('users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post('users')
  createUser(@Body(new ValidationPipe()) userData: CreateUserDto) { 
    return this.usersService.createUser(userData);
  }

  @Put('users/:id')
  updateUserById(@Param('id') id: string, @Body(new ValidationPipe()) userData: UpdateUserDto) { 
    return this.usersService.updateUserById(id, userData);
  }

  @Put('users/password/:id')
  updateUserPassword(@Param('id') id: string, @Body(new ValidationPipe()) userData: UpdateUserPasswordDto) { 
    return this.usersService.updateUserPassword(id, userData);
  }

  @Delete('users/:id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
