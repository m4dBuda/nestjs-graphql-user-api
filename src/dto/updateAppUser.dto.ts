import { IsEmail, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  idUserType?: number;
}
