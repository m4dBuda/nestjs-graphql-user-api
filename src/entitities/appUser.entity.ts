import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class AppUserEntity {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Number)
  idUserType: number;

  @Field(() => String)
  type: string;

  @Field(() => String)
  token?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
