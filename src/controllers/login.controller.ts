import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserLoginService } from '../services/userLogin.service';
import { UserLoginDto } from '../dto/userLogin/userLogin.dto';

@Controller('app')
export class UserLoginController {
  constructor(private readonly usersService: UserLoginService) {}

  @Post('login')
  async loginUser(@Body(new ValidationPipe()) userData: UserLoginDto) {
    return await this.usersService.userLogin(userData);
  }
}
