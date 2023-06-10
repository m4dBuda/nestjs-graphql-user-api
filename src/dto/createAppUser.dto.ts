import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field()
  @IsNotEmpty()
  idUserType: number;
}
