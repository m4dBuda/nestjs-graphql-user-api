import { IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordDto {
  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
