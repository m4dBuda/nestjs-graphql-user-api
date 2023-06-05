import { IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  name?: string;

  @IsEmail()
  email?: string;

  idUserType?: number;
}
