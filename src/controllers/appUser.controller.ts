
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppUserService } from '../../app/appUser/app.service';
import { CreateAppUserDto } from '../dto/create-appUser.dto';

@Controller('app')
export class AppUserController {
constructor(private readonly usersService: AppUserService) {}

@Get('users')
getAllUsers() {
return this.usersService.getAllUsers();
}

@Post('users')
createUser(@Body() userData: CreateAppUserDto) {
return this.usersService.createUser(userData);
}
}